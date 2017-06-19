// AnyChat for Web SDK

/********************************************
 *				业务逻辑控制				*
 *******************************************/

var mDefaultServerAddr = "111.47.65.161";		// 默认服务器地址
var mDefaultServerPort = 8906;					// 默认服务器端口号
var mSelfUserId = -1; 							// 本地用户ID
var mTargetPersonId = -1;							// 目标用户ID（请求了对方的音视频）
var mTargetEmployerId = -1;							// 目标用户ID（请求了对方的音视频）
var mRefreshVolumeTimer = -1; 					// 实时音量大小定时器
var mRefreshPluginTimer = -1;					// 检查插件是否安装完成定时器

// 日志记录类型，在日志信息栏内显示不同的颜色
var LOG_TYPE_NORMAL = 0;
var LOG_TYPE_API = 1;
var LOG_TYPE_EVENT = 2;
var LOG_TYPE_ERROR = 3;

// 通知类型，在文字消息栏内显示不同的颜色
var NOTIFY_TYPE_NORMAL = 0;
var NOTIFY_TYPE_SYSTEM = 1;


function LogicInit() {
    setTimeout(function () {
        if (navigator.plugins && navigator.plugins.length) {
            window.navigator.plugins.refresh(false);
        }
        var errorcode = BRAC_InitSDK(0); 	// 初始化插件
        // AddLog("BRAC_InitSDK(" + NEED_ANYCHAT_APILEVEL + ")=" + errorcode, LOG_TYPE_API);
        if (errorcode == 0) {
            if (mRefreshPluginTimer != -1)
                clearInterval(mRefreshPluginTimer); 			// 清除插件安装检测定时器

            setTimeout(function () {
                var errorcode = BRAC_Connect(mDefaultServerAddr, mDefaultServerPort);

            }, 1000);


        } else { 						// 没有安装插件，或是插件版本太旧，显示插件下载界面

           // alert(1);
            if (mRefreshPluginTimer == -1) {
                mRefreshPluginTimer = setInterval(function () { LogicInit(); }, 1000);
            }
        }
    }, 500);
}

//设置AnyChat参数，需要在收到登录成功回调之后调用
function ConfigAnyChatParameter() {

}



function GetID(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (window[id]) {
        return window[id];
    }
    return null;
}
// 打开指定用户的音视频
function RequestEmployerVideo(userid) {

    // 判断是否需要关闭之前已请求的用户音视频数据
    if (mTargetEmployerId != -1) {
        BRAC_UserCameraControl(mTargetEmployerId, 0);
        BRAC_UserSpeakControl(mTargetEmployerId, 0);
    }
    mTargetEmployerId = userid; 					//设置被点用户ID为全局变量
    BRAC_UserCameraControl(userid, 1); 		// 请求对方视频
    BRAC_UserSpeakControl(userid, 1); 		// 请求对方语音
    // 设置远程视频显示位置
    BRAC_SetVideoPos(userid, GetID("AnyChatEmployerVideoDiv"), "ANYCHAT_VIDEO_Employer");
}

function RequestPersonVideo(userid) {

    // 判断是否需要关闭之前已请求的用户音视频数据
    if (mTargetPersonId != -1) {
        BRAC_UserCameraControl(mTargetPersonId, 0);
        BRAC_UserSpeakControl(mTargetPersonId, 0);
    }
    mTargetPersonId = userid; 					//设置被点用户ID为全局变量
    BRAC_UserCameraControl(userid, 1); 		// 请求对方视频
    BRAC_UserSpeakControl(userid, 1); 		// 请求对方语音
    // 设置远程视频显示位置
    BRAC_SetVideoPos(userid, GetID("AnyChatPersonVideoDiv"), "ANYCHAT_VIDEO_Person");
}

// 对列表中的用户进行添加、删除操作
function RoomUserListControl(userid, bInsert) {
    var userlist = GetID("room_div_userlist");
    if (bInsert) {
        var itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "UserListStyle");
        itemdiv.id = userid + "_UserDiv";

        // 判断用户摄像头状态
        if (BRAC_GetCameraState(userid) == 0)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "", userid); // 添加摄像头图片<img>标签
        if (BRAC_GetCameraState(userid) == 1)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_false.png", userid); // 添加摄像头图片<img>标签
        if (BRAC_GetCameraState(userid) == 2)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_true.png", userid); // 添加摄像头图片<img>标签
        // 判断当前ID是否为自己
        if (userid == mSelfUserId) {
            AddImage(itemdiv, mSelfUserId + "_MicrophoneTag", "mSelfMicrophoneTag", "./images/advanceset/microphone_true.png", userid); // 添加话筒图片<img>标签
            itemdiv.innerHTML += "&nbsp" + BRAC_GetUserName(mSelfUserId) + "(自己)";
        } else {
            AddImage(itemdiv, userid + "_MicrophoneTag", "MicrophoneTag", "./images/advanceset/microphone_false.png", userid); // 添加话筒图片<img>标签
            // 添加用户姓名<a>标签
            var a = document.createElement("a");
            a.id = userid + "_UserTag";
            a.title = BRAC_GetUserName(userid);
            a.innerHTML = BRAC_GetUserName(userid);
            a.href = "javascript:RequestOtherUserVideo(" + userid + ")";
            itemdiv.appendChild(a);
        }
        GetID("room_div_userlist").appendChild(itemdiv);
        MicrophoneOnclick(mSelfUserId);
    } else {
        var my = GetID(userid + "_UserDiv");
        userlist.removeChild(my);
    }
    DisplayScroll("room_div_userlist");
}
//div按钮鼠标划入划出效果
function Mouseover(id) {
    GetID(id).style.backgroundColor = "#FFFFCC";
}
//div按钮鼠标划入划出效果
function Mouseout(id) {
    GetID(id).style.backgroundColor = "#E6E6E6";
}
//获取当前时间  (00:00:00)
function GetTheTime() {
    var TheTime = new Date();
    return TheTime.toLocaleTimeString();
}

// 添加日志并显示，根据不同的类型显示不同的颜色
function AddLog(message, type) {
    if (type == LOG_TYPE_API) {			// API调用日志，绿色
        message = message.fontcolor("Green");
    } else if (type == LOG_TYPE_EVENT) {	// 回调事件日志，黄色
        message = message.fontcolor("#CC6600");
    } else if (type == LOG_TYPE_ERROR) {	// 出错日志，红色
        message = message.fontcolor("#FF0000");
    } else {							// 普通日志，灰色
        message = message.fontcolor("#333333");
    }
    GetID("LOG_DIV_CONTENT").innerHTML += message + "&nbsp" + GetTheTime().fontcolor("#333333") + "<br />";
    DisplayScroll("LOG_DIV_CONTENT");
}

// 显示等待进度条，提示用户操作正在进行中
function DisplayLoadingDiv(bShow) {
    if (bShow) {
        GetID("LOADING_DIV").style.display = "block";
        GetID("LOADING_GREY_DIV").style.display = "block";
        var TheHeight = document.documentElement.clientHeight;
        var TheWidth = document.body.offsetWidth;
        GetID("LOADING_DIV").style.marginTop = (TheHeight - 50) / 2 + "px";
        GetID("LOADING_DIV").style.marginLeft = (TheWidth - 130) / 2 + "px";
    }
    else {
        GetID("LOADING_DIV").style.display = "none";
        GetID("LOADING_GREY_DIV").style.display = "none";
    }
}

//好友 摄像头  话筒  图标
function AddImage(parent_id, img_id, img_class, fir_img, userid) {
    var imgs = document.createElement("img");
    imgs.id = img_id;
    imgs.className = img_class;
    imgs.src = fir_img;
    imgs.style.width = "15px";
    imgs.style.height = "15px";
    parent_id.appendChild(imgs);
}
// 为被点击用户话筒按钮添加点击事件
function MicrophoneOnclick(userid) {
    GetID(userid + "_MicrophoneTag").style.cursor = "pointer"; // 鼠标形状
    GetID(userid + "_MicrophoneTag").onclick = function () { // 话筒点击事件
        var ImgPath = GetID(userid + "_MicrophoneTag").src.split('/');
        if (ImgPath[ImgPath.length - 1] == "microphone_true.png") {
            GetID(userid + "_MicrophoneTag").src = "./images/advanceset/microphone_false.png";
            BRAC_UserSpeakControl(userid, 0); // 关闭语音
        }
        else {
            GetID(userid + "_MicrophoneTag").src = "./images/advanceset/microphone_true.png";
            BRAC_UserSpeakControl(userid, 1); // 开启语音
        }
    }
}
//恢复显示视频div大小
function reVideoDivSize() {
    var divWidth = GetID("AnyChatRemoteVideoDiv").offsetWidth;
    var divHeight = GetID("AnyChatRemoteVideoDiv").offsetHeight;
    if (divWidth < divHeight) {
        GetID("AnyChatRemoteVideoDiv").style.width = (4.0 / 3 * divHeight) + "px";
        GetID("AnyChatRemoteVideoDiv").style.height = divHeight + "px";
    }
}