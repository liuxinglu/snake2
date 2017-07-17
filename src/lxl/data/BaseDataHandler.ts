module lxl.data {
	export class BaseDataHandler
		extends CDispatcher
		implements interfaces.IDataHandler {
		public constructor() {
			super();
		}

		public getCode(): string {
			return "";
		}

		public handlerPackage(data: data.BaseData): void {

		}

		public configure(data:interfaces.IPackageIn): void {

		}

		public send(data: data.BaseData = null): void {

		}

	}
}