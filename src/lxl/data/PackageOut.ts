module lxl.data {
	export class PackageOut implements lxl.interfaces.IPackageOut {
		public constructor(code: string) {
			this._code = code;
			this._o = new BaseData();
		}

		private _code: string;
		private _o: BaseData;

		public writeString(str: string): void {
			if (str == null) {
				this._o.str.writeUTF("");
			} else {
				this._o.str.writeUTFBytes(str);
			}
		}

		public writeArray(arr: Array<any>): void {
			if (arr.length > 0)
				this._o.arr = arr;
		}

		public getParamLen(): number {
			return this._o.arr.length
		}

		public getParamByIndex(index: number): any {
			if (index >= 0) {
				return this._o.arr[index];
			} else {
				return 0;
			}
		}

		public getParam(): Array<Map> {
			return this._o.arr;
		}

		public code(): string {
			return this._code;
		}

		public getFullUrl(): string {
			return "";
		}

	}
}