/*---------------------------------------------------------------------------------------------
 *  Devonz Bridge Service
 *  Provides real-time WebSocket sync between the Devonz desktop editor and the Devonz web platform.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../../base/common/event.js';
import { ILogService } from '../../../../../platform/log/common/log.js';
import { INotificationService, Severity } from '../../../../../platform/notification/common/notification.js';

export const enum DevonzBridgeState {
	Disconnected = 'disconnected',
	Connecting = 'connecting',
	Connected = 'connected',
	Error = 'error',
}

export interface IDevonzBridgeMessage {
	event: string;
	payload: unknown;
	timestamp: number;
	sessionId: string;
}

export interface IDevonzBridgeService {
	readonly state: DevonzBridgeState;
	readonly onStateChange: Event<DevonzBridgeState>;
	readonly onMessage: Event<IDevonzBridgeMessage>;
	connect(apiUrl: string, projectId: string, token: string): void;
	send(event: string, payload: unknown): void;
	disconnect(): void;
}

export class DevonzBridgeService extends Disposable implements IDevonzBridgeService {
	private _ws: WebSocket | null = null;
	private _state = DevonzBridgeState.Disconnected;
	private _reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private _reconnectAttempts = 0;
	private readonly _maxReconnectAttempts = 10;
	private _sessionId = '';
	private _connectionParams: { apiUrl: string; projectId: string; token: string } | null = null;

	private readonly _onStateChange = this._register(new Emitter<DevonzBridgeState>());
	readonly onStateChange: Event<DevonzBridgeState> = this._onStateChange.event;

	private readonly _onMessage = this._register(new Emitter<IDevonzBridgeMessage>());
	readonly onMessage: Event<IDevonzBridgeMessage> = this._onMessage.event;

	constructor(
		@ILogService private readonly _logService: ILogService,
		@INotificationService private readonly _notificationService: INotificationService,
	) {
		super();
	}

	get state(): DevonzBridgeState {
		return this._state;
	}

	connect(apiUrl: string, projectId: string, token: string): void {
		this._connectionParams = { apiUrl, projectId, token };
		this._sessionId = `${projectId}-${Date.now()}`;
		this._doConnect();
	}

	private _doConnect(): void {
		if (!this._connectionParams) { return; }
		const { apiUrl, projectId, token } = this._connectionParams;
		const wsUrl = `${apiUrl.replace(/^http/, 'ws')}/ws/editor?project=${projectId}&token=${token}`;

		this._setState(DevonzBridgeState.Connecting);
		this._logService.info(`[DevonzBridge] Connecting to ${wsUrl}`);

		this._ws = new WebSocket(wsUrl);

		this._ws.onopen = () => {
			this._reconnectAttempts = 0;
			this._setState(DevonzBridgeState.Connected);
			this._logService.info('[DevonzBridge] Connected ✓');
		};

		this._ws.onmessage = (e: MessageEvent) => {
			try {
				const msg: IDevonzBridgeMessage = JSON.parse(e.data as string);
				this._onMessage.fire(msg);
			} catch {
				// ignore malformed messages
			}
		};

		this._ws.onclose = () => {
			this._setState(DevonzBridgeState.Disconnected);
			this._scheduleReconnect();
		};

		this._ws.onerror = () => {
			this._setState(DevonzBridgeState.Error);
			this._logService.error('[DevonzBridge] WebSocket error');
		};
	}

	send(event: string, payload: unknown): void {
		if (this._ws?.readyState !== WebSocket.OPEN) { return; }
		const msg: IDevonzBridgeMessage = {
			event,
			payload,
			timestamp: Date.now(),
			sessionId: this._sessionId,
		};
		this._ws.send(JSON.stringify(msg));
	}

	disconnect(): void {
		if (this._reconnectTimer) { clearTimeout(this._reconnectTimer); }
		this._ws?.close();
		this._ws = null;
		this._setState(DevonzBridgeState.Disconnected);
	}

	private _setState(state: DevonzBridgeState): void {
		this._state = state;
		this._onStateChange.fire(state);
	}

	private _scheduleReconnect(): void {
		if (this._reconnectAttempts >= this._maxReconnectAttempts) {
			this._notificationService.notify({
				severity: Severity.Warning,
				message: 'Devonz Bridge: Could not reconnect after multiple attempts. Check your connection.',
			});
			return;
		}
		const delay = Math.min(1000 * Math.pow(2, this._reconnectAttempts), 30000);
		this._reconnectAttempts++;
		this._logService.info(`[DevonzBridge] Reconnecting in ${delay}ms (attempt ${this._reconnectAttempts})`);
		this._reconnectTimer = setTimeout(() => this._doConnect(), delay);
	}

	override dispose(): void {
		this.disconnect();
		super.dispose();
	}
}
