module lxl {
	export class ResManager extends CDispatcher{
		public constructor() {
			super();
		}

		/**
		 * 加载配置文件并解析
		 */
		public loadConfig(url:string, resourceRoot:string):void {
			RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this._configComplete, this);
			RES.loadConfig(url, resourceRoot);
		}

		private _configComplete(e:RES.ResourceEvent):void {
			RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this._configComplete, this);
			this.dispatch(new CEvent(CEvent.LOAD_CONFIG_COMPLETE, e));
		}

		/**
		 * 加载一组资源
		 */
		public loadGroup(group:string):void {
			RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
			RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
			RES.loadGroup(group);
		}

		private _onResourceLoadComplete(e:RES.ResourceEvent):void {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this._onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this._onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this._onResourceProgress, this);	
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this._onItemLoadError, this);
			this.dispatch(new CEvent(CEvent.LOAD_GROUP_COMPLETE, e));
		}

		public getRes(resName:string):any {
			return RES.getRes(resName);
		}

		/**
		 * 异步获取配置文件
		 */
		public getResAsync(resName:string, cb:any, ctx:any) {
			RES.getResAsync(resName, cb, ctx);
		}

		public getResByUrl(resName:string, cb:any, ctx:any, resType:string) {
			// RES.getResByUrl(resName, cb, ctx, resType);
			var loader = new egret.URLLoader();
			loader.addEventListener(egret.Event.COMPLETE, cb, ctx);
			loader.dataFormat = resType;
			var request = new egret.URLRequest(resName);
			loader.load(request);
		}

		private _onResourceLoadError(e:RES.ResourceEvent):void {
			logs.log("Group:" + e.groupName + "加载失败");
			this._onResourceLoadComplete(e);
		}

		private _onItemLoadError(e:RES.ResourceEvent):void {
			logs.log("URL:" + e.resItem.url + " 加载出错");
		}

		private _onResourceProgress(e:RES.ResourceEvent):void {
			this.dispatch(new CEvent(CEvent.LOAD_PROGRESS, e));
		}

		/**
		 * 同步获取序列帧动画
		 *  */
		public getMovieClip(jsonName:string, pngName:string, mcName:string):egret.MovieClip {
			let data = RES.getRes(jsonName);
			let tex = RES.getRes(pngName);
			let mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, tex);
			let mc:egret.MovieClip = new egret.MovieClip(mcf.generateMovieClipData(mcName));
			return mc;
		}

		/**
		 * 异步获取序列帧动画
		 */
		public getMovieClipAsync(jsonName:string, pngName:string, mcName:string, callback:Function, ctx:any) {
			let count:number = 0;
			let mcTexture:egret.Texture;
			let mcData;
			let mc:egret.MovieClip;
			let check = function () {
				count++;
				if (count == 2) {
					let mcf:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(mcData, mcTexture);
					mc = new egret.MovieClip(mcf.generateMovieClipData(mcName));
					callback.call(ctx, mc);
				}
			}

			this.getResByUrl(Config.MC_PATH + pngName, function (e:egret.Event) {
				mcTexture = e.currentTarget.data;
				check();
			}, this, egret.URLLoaderDataFormat.TEXTURE);

			this.getResByUrl(Config.MC_PATH + pngName, function (e:egret.Event) {
				mcData = JSON.parse(e.currentTarget.data);
				check();
			}, this, egret.URLLoaderDataFormat.TEXT);
		}

	}
}