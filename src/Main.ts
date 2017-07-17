var Res = lxl.GlobalData.getInstance().resManager;
var Snake = app.SnakeManager.getInstance();
class Main extends lxl.Application {
    
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected start(): void {
        super.start();
        this.root = new app.SnakeSence();
        lxl.GlobalData.getInstance().root = this;
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        this.stage.orientation = egret.OrientationMode.LANDSCAPE;
    }

}
