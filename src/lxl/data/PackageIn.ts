module lxl.data {
	export class PackageIn implements lxl.interfaces.IPackageIn {
		public constructor(code: string, body: BaseData) {
			this._code = code;
			this._o = new BaseData();
			this._o = body;
		}

		private _code: string;
		private _o: BaseData;

		public code(): string {
			return this._code;
		}

		public readObj(): BaseData {
			return this._o;
		}

		public readObjStr(): string {
			var str: string = JSON.stringify(this._o);
			if (this._o.propertyIsEnumerable("")) {
				for (let i in this._o) {
					str.concat(i, this._o[i])
				}
			}
			return str;
		}

	}
}