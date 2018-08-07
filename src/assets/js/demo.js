//用于复制jquery对象
var _jQuery = null;
var _preTableDatas = [];
var _selectPre = '';
var isShadown = true;
var isTool = false;

$(function() {
    _jQuery = $;
    initTable();
    $('#video-dialog').attr('src', './dialog/cameraDialog.html');
    $("#init-btn").click(function() {

        earthGis.InitSky({
            targetID: "map",
            projectId: "project-tree",
            flyPath: $("#sky-file-url").val(),
            lon: 121.35,
            lat: 31.45
        }, initFinishCallback);

    });


    function initFinishCallback() {
        earthGis.initCrossBox("工具\\cross_section");
        earthGis.getObjectValue(objValueCallBack);
        earthGis.addShadow();
    }

    /**
     * 获取对象得属性值
     * @param {*} attributes 
     */
    function objValueCallBack(attributes) {
        if (isTool) {
            if (attributes.length > 0) {
                var fileName = attributes[0].value;
                alert(fileName);
            }
        }

    }

    $("#close-property-btn").click(function() {
        isTool = false;
    });



    $("#get-property-btn").click(function() {
        isTool = true;
    });


    /*************常用工具************** */
    $("#get-pos-btn").click(function() {
        earthGis.getPostion(posValueCallBack);

    });

    function posValueCallBack(pos) {
        $("#x-value").val(pos[0]);
        $("#y-value").val(pos[1]);
        $("#h-value").val(pos[2]);
    }

    /**
     * 飞到位置一
     */
    $("#fly-one").click(function() {
        var conf = {
            Altitude: 40.46423360425979,
            AltitudeType: 0,
            Yaw: 90,
            Pitch: -45,
            Roll: 0,
            Distance: 100,
        };
        earthGis.flyTo(121.43490245699601, 31.195224803074975, conf);

    });

    /**
     * 飞到位置二
     */
    $("#fly-two").click(function() {
        var conf = {
            Altitude: 11.123481736518442,
            AltitudeType: 0,
            Yaw: 90,
            Pitch: -45,
            Roll: 0,
            Distance: 5,
        };
        earthGis.flyTo(121.4350603878841, 31.195289956442906, conf);

    });

    /**
     * 飞到滨江
     */
    $("#fly-binjiang").click(function() {
        var conf = {
            Altitude: 127.07143013738096,
            AltitudeType: 0,
            Yaw: 0,
            Pitch: -45,
            Roll: 0,
            Distance: 200,
        };
        earthGis.flyTo(121.46689358134892, 31.191888072097, conf);
    });


    /**
     * 飞到小区
     */
    $("#fly-community").click(function() {
        var conf = {
            Altitude: 4.7529096603393555,
            AltitudeType: 0,
            Yaw: 0,
            Pitch: -45,
            Roll: 0,
            Distance: 200,
        };
        earthGis.flyTo(121.42012472244377, 31.176393655855335, conf);
    });





    $("#save-file-btn").click(function() {
        earthGis.saveFly();
    });



    $("#save-image-btn").click(function() {
        earthGis.saveToImage();
    });


    $("#measure-distance-btn").click(function() {
        earthGis.measureDistance();
    });



    /*************************** */

    $("#btn-init-cs").click(function() {
        earthGis.initBox("工具\\cross_section");
    });






    /************分析工具************** */
    /**
     * 纵截面
     */
    $("#btn-init-cs-vertial").click(function() {

        var conf = {
            Altitude: 9.73983155284077,
            AltitudeType: 0,
            Yaw: 0,
            Pitch: -45,
            Roll: 0,
            Distance: 200,
        };
        earthGis.flyTo(config.shangchang.cs.x, config.shangchang.cs.y, conf);
        earthGis.begainCrossSection(config.shangchang.cs);
        if (isShadown) {
            Earth.addShadow();
            isShadown = false;
        }

        //earthGis.vertical(114);
    });


    /**
     * 横截面
     */
    $("#btn-init-cs-horzion").click(function() {
        var conf = {
            Altitude: 9.73983155284077,
            AltitudeType: 0,
            Yaw: 150,
            Pitch: -35,
            Roll: 0,
            Distance: 150,
        };
        earthGis.flyTo(config.shangtu.cs.x, config.shangtu.cs.y, conf);
        earthGis.begainCrossSection(config.shangtu.cs);
        if (isShadown) {
            Earth.addShadow();
            isShadown = false;
        }
    });






    $("#btn-cs-behind").click(function() {
        earthGis.moveCrossSection(0.1);
    });
    $("#btn-cs-before").click(function() {
        earthGis.moveCrossSection(-0.1);
    });
    $("#btn-cs-up").click(function() {
        earthGis.moveCrossSection(-0.1);
    });
    $("#btn-cs-down").click(function() {
        earthGis.moveCrossSection(0.1);
    });



    $("#btn-more-floor").click(function() {
        var conf = [config.fengceng.expend.one, config.fengceng.expend.two];
        var confFly = {
            Altitude: 25.69334700424224,
            AltitudeType: 0,
            Yaw: 160,
            Pitch: -45,
            Roll: 0,
            Distance: 50,
        };
        earthGis.flyTo(121.42549164197291, 31.173917138061085, confFly);

        earthGis.controlLayerVisibilty("分层\\tl12_sw_53", false);
        earthGis.controlModelPosition(conf);

        //earthGis.vertical(114);
    });

    $("#btn-more-floor-close").click(function() {
        var conf = [config.fengceng.normal.one, config.fengceng.normal.two];

        earthGis.controlLayerVisibilty("分层\\tl12_sw_53", true);
        earthGis.controlModelPosition(conf);

        //earthGis.vertical(114);
    });

    $("#btn-shadown").click(function() {
        earthGis.addShadow();
        //earthGis.vertical(114);
    });


    /**
     * 关闭
     */
    $("#btn-init-cs-close").click(function() {
        earthGis.closeCrossSection();
        if (!isShadown) {
            earthGis.addShadow();
            isShadown = true;
        }
    });



    /**
     * 视点分析
     */
    $("#lineofsight-btn").click(function() {
        /*  var conf = {
             objName: 'temp',
             groupName: '',
             modelType: 0,
             callback: lineOfSightCallback
         }
         earthGis.InitLineOfSight(conf); */
        earthGis.lineOfSight();
    });

    function lineOfSightCallback(dis) {
        $("#ls-dis").val(dis);
    }


    /**
     * 视域分析
     */
    $("#view-btn").click(function() {
        //earthGis.view3D();
        var _3dconfig = {
            horizontalFOVID: parseFloat($("#horizon-view-value").val()),
            verticalFOVID: parseFloat($("#vertical-view-value").val()),
            distance: parseFloat($("#distance-view-value").val()),
            viewName: "test",
            groupName: "",
        };
        earthGis.Init3DViewshed(_3dconfig);
    });

    $("#xray-btn").click(function() {
        earthGis.XRay(0);
    });

    $("#xray-close-btn").click(function() {
        earthGis.XRay(1);
    });

    /**
     * 视域动态分析
     */
    $("#view-animation-btn").click(function() {
        var speed = $("#car-speed").val();
        var _3dconfig = {
            speed: speed === "" ? 20 : speed,
            speedUnit: 1,
            altitude: 2,
            viewDistance: 300,
            loop: '1',
            colorScheme: '0',
            modelType: '1',
            modelFile: 'http://47.98.241.102:8085/3dDemo/car/car.xpl2',
            interval: '300',
            minAltitude: '',
            maxAltitude: '',
            objType: 0,
            parentName: '',
            viewGroupName: 'test',
            viewName: 'test1',
            modelName: '1234'
        };
        earthGis.start3DViewRoute(_3dconfig);
    });
    /************分析工具************** */

    /************安防工具************** */
    /**
     * 添加人模型
     */
    $("#add-police-btn").click(function() {
        var policeName = $("#police-file-url").val();
        var modelConfig = {
            modelFile: 'http://47.98.241.102:8085/3dDemo/policeman/police.xpl2',
            //modelFile: 'E:/Projects/徐汇3D/智慧安防/数据/3dDemo/policeman/police.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\警员组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });

    function modelCallback(model) {

    }

    /**
     * 添加车模型
     */
    $("#add-car-btn").click(function() {
        var policeName = $("#car-file-url").val();
        var modelConfig = {
            modelFile: 'http://47.98.241.102:8085/3dDemo/car/car.xpl2',
            //modelFile: 'E:/Projects/徐汇3D/智慧安防/数据/3dDemo/car/car2.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\警员组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });

    /**
     * 添加救护车模型
     */
    $("#add-helpcar-btn").click(function() {
        var policeName = $("#helpcar-file-url").val();
        var modelConfig = {
            modelFile: 'http://47.98.241.102:8085/3dDemo/car/helpcar.xpl2',
            // modelFile: 'E:/Projects/徐汇3D/智慧安防/数据/3dDemo/car/helpcar.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\警员组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });

    /**
     * 添加消防车车模型
     */
    $("#add-firecar-btn").click(function() {
        var policeName = $("#firecar-file-url").val();
        var modelConfig = {
            modelFile: 'http://47.98.241.102:8085/3dDemo/car/firecar.xpl2',
            //modelFile: 'E:/Projects/徐汇3D/智慧安防/数据/3dDemo/car/firecar.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\警员组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });


    /**
     * 添加摄像模型
     */
    $("#add-cam-btn").click(function() {
        var policeName = $("#cam-file-url").val();
        var modelConfig = {
            // modelFile: 'http://47.98.241.102:8085/3dDemo/camera/camera11.xpl2',
            modelFile: 'E:/Projects/徐汇3D/智慧安防/数据//3dDemo/camera/camera11.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\摄像头组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });


    /**
     * 添加障碍模型
     */
    $("#add-break-btn").click(function() {
        var policeName = $("#add-break-url").val();
        var modelConfig = {
            // modelFile: 'http://47.98.241.102:8085/3dDemo/camera/camera11.xpl2',
            modelFile: 'E:/Projects/徐汇3D/智慧安防/数据//3dDemo/break/luzhang/luzhang.xpl2',
            scale: 1,
            ModeType: 0,
            groupId: '预案\\' + _selectPre + '\\警员组',
            modelName: policeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addModel(modelConfig, modelCallback);
    });

    /**
     * 添加烟雾特效
     */
    $("#add-smoke-btn").click(function() {
        var smokeName = $("#add-smoke-url").val();
        var modelConfig = {
            // modelFile: 'http://47.98.241.102:8085/3dDemo/camera/camera11.xpl2',
            modelFile: '工具\\特效\\烟',
            //scale: parseInt(smokeScale),
            groupId: '预案\\' + _selectPre,
            modelName: smokeName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addEffect(modelConfig);
    });


    /**
     * 添加火模型
     */
    $("#add-fire-btn").click(function() {
        var fireName = $("#add-fire-url").val();
        var modelConfig = {
            // modelFile: 'http://47.98.241.102:8085/3dDemo/camera/camera11.xpl2',
            modelFile: '工具\\特效\\火',
            //scale: parseInt(smokeScale),
            groupId: '预案\\' + _selectPre,
            modelName: fireName,
            saveInFly: true,
            attachFloor: false,
            initHeight: 0.5
        };
        earthGis.addEffect(modelConfig);
    });




    /**
     * 新增预案
     */
    $("#add-pre-btn").click(function() {
        var preName = $("#new-pre-name").val();
        if (preName !== null) {
            earthGis.addGroup(preName, '预案');
            _preTableDatas.push({
                "id": ++_index,
                "preName": 'preName',
                "operate": '<img src="../assets/images/edit.svg" alt="logo" class="table-operate">'
            });
            _jQuery('#preTable').bootstrapTable("load", _preTableDatas);
        }
    });


    $("#save-pre-btn").click(function() {
        /*  var preName = $("#pre-file-url").val();
         if (preName === '') {
             alert('请输入预案名称');
             return;
         }
         var filePath = earthGis.saveGroupToFly("警员组", preName); */
        earthGis.saveFly();
    });

    $("#back-pre-btn").click(function() {
        $(".pre-list-panel").show();
        $(".pre-info-panel").hide();
    });


    /************安防工具************** */








    /************人物浏览************** */

    /**
     * 室外
     */
    $("#init-outdoor-btn").click(function() {
        earthGis.startPeopleMove();

    });
    /**
     * 室内
     */
    $("#init-indoor-btn").click(function() {
        earthGis.startPeopleMove();
    });
    /**
     * 结束
     */
    $("#end-browser-btn").click(function() {
        earthGis.endPeopleMove();
    });


    /************人物浏览************** */
    /**
     * 结束雾
     */
    $("#fog-close-btn").click(function() {
        earthGis.addFog(0);
    });

    /**
     * 雾
     */
    $("#fog-btn").click(function() {
        earthGis.addFog(1);
    });
    /**
     * 结束雨
     */
    $("#rain-close-btn").click(function() {
        earthGis.addRain(0);
    });

    /**
     * 雨
     */
    $("#rain-btn").click(function() {
        earthGis.addRain(1);
    });
    /**
     * 雪
     */
    $("#snow-close-btn").click(function() {
        earthGis.addSnow(0);
    });

    /**
     * 雪
     */
    $("#snow-btn").click(function() {
        earthGis.addSnow(1);
    });




});

var _index = 0;
/**
 * 初始化列表
 */
function initTable() {

    _preTableDatas.push({
        "id": ++_index,
        "preName": '警力布控方案1',
        "operate": '<img src="../assets/images/edit.svg" alt="logo" class="table-operate">'
    });
    _preTableDatas.push({
        "id": ++_index,
        "preName": '警力布控方案2',
        "operate": '<img src="../assets/images/edit.svg" alt="logo" class="table-operate">'
    });


    _jQuery('#preTable').bootstrapTable({
        method: 'get',
        cache: false,
        height: _jQuery('#preTable').height(),
        striped: true,
        pagination: true,
        pageSize: 12,
        pageNumber: 1,
        pageList: [10, 20, 50, 100],
        sidePagination: 'client',
        onlyInfoPagination: false,
        search: false,
        searchAlign: "left",
        showColumns: false,
        showRefresh: false,
        showFullscreen: true,
        columns: [{
            field: "id",
            title: "序号",
            align: "center",
            valign: "middle",
            sortable: true,
            width: 30
        }, {
            field: "preName",
            title: "预案名称",
            align: "center",
            valign: "middle",
            /*    width: 180, */
            sortable: true
        }, {
            field: "operate",
            title: "操作",
            align: "center",
            valign: "middle",
            sortable: false,
            width: 80
        }],
        data: _preTableDatas,
        onClickRow: function(row, field) {
            var preName = row.preName;
            _selectPre = preName;
            $("#pre-title").html(preName);
            $(".pre-list-panel").hide();
            $(".pre-info-panel").show();
        }
    });
}



function cancelDialog() {
    $(".media-panel").hide();
}