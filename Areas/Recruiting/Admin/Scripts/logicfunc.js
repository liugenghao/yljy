// AnyChat for Web SDK

/********************************************
 *				ҵ���߼�����				*
 *******************************************/

var mDefaultServerAddr = "111.47.65.161";		// Ĭ�Ϸ�������ַ
var mDefaultServerPort = 8906;					// Ĭ�Ϸ������˿ں�
var mSelfUserId = -1; 							// �����û�ID
var mTargetPersonId = -1;							// Ŀ���û�ID�������˶Է�������Ƶ��
var mTargetEmployerId = -1;							// Ŀ���û�ID�������˶Է�������Ƶ��
var mRefreshVolumeTimer = -1; 					// ʵʱ������С��ʱ��
var mRefreshPluginTimer = -1;					// ������Ƿ�װ��ɶ�ʱ��

// ��־��¼���ͣ�����־��Ϣ������ʾ��ͬ����ɫ
var LOG_TYPE_NORMAL = 0;
var LOG_TYPE_API = 1;
var LOG_TYPE_EVENT = 2;
var LOG_TYPE_ERROR = 3;

// ֪ͨ���ͣ���������Ϣ������ʾ��ͬ����ɫ
var NOTIFY_TYPE_NORMAL = 0;
var NOTIFY_TYPE_SYSTEM = 1;


function LogicInit() {
    setTimeout(function () {
        if (navigator.plugins && navigator.plugins.length) {
            window.navigator.plugins.refresh(false);
        }
        var errorcode = BRAC_InitSDK(0); 	// ��ʼ�����
        // AddLog("BRAC_InitSDK(" + NEED_ANYCHAT_APILEVEL + ")=" + errorcode, LOG_TYPE_API);
        if (errorcode == 0) {
            if (mRefreshPluginTimer != -1)
                clearInterval(mRefreshPluginTimer); 			// ��������װ��ⶨʱ��

            setTimeout(function () {
                var errorcode = BRAC_Connect(mDefaultServerAddr, mDefaultServerPort);

            }, 1000);


        } else { 						// û�а�װ��������ǲ���汾̫�ɣ���ʾ������ؽ���

           // alert(1);
            if (mRefreshPluginTimer == -1) {
                mRefreshPluginTimer = setInterval(function () { LogicInit(); }, 1000);
            }
        }
    }, 500);
}

//����AnyChat��������Ҫ���յ���¼�ɹ��ص�֮�����
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
// ��ָ���û�������Ƶ
function RequestEmployerVideo(userid) {

    // �ж��Ƿ���Ҫ�ر�֮ǰ��������û�����Ƶ����
    if (mTargetEmployerId != -1) {
        BRAC_UserCameraControl(mTargetEmployerId, 0);
        BRAC_UserSpeakControl(mTargetEmployerId, 0);
    }
    mTargetEmployerId = userid; 					//���ñ����û�IDΪȫ�ֱ���
    BRAC_UserCameraControl(userid, 1); 		// ����Է���Ƶ
    BRAC_UserSpeakControl(userid, 1); 		// ����Է�����
    // ����Զ����Ƶ��ʾλ��
    BRAC_SetVideoPos(userid, GetID("AnyChatEmployerVideoDiv"), "ANYCHAT_VIDEO_Employer");
}

function RequestPersonVideo(userid) {

    // �ж��Ƿ���Ҫ�ر�֮ǰ��������û�����Ƶ����
    if (mTargetPersonId != -1) {
        BRAC_UserCameraControl(mTargetPersonId, 0);
        BRAC_UserSpeakControl(mTargetPersonId, 0);
    }
    mTargetPersonId = userid; 					//���ñ����û�IDΪȫ�ֱ���
    BRAC_UserCameraControl(userid, 1); 		// ����Է���Ƶ
    BRAC_UserSpeakControl(userid, 1); 		// ����Է�����
    // ����Զ����Ƶ��ʾλ��
    BRAC_SetVideoPos(userid, GetID("AnyChatPersonVideoDiv"), "ANYCHAT_VIDEO_Person");
}

// ���б��е��û�������ӡ�ɾ������
function RoomUserListControl(userid, bInsert) {
    var userlist = GetID("room_div_userlist");
    if (bInsert) {
        var itemdiv = document.createElement("div");
        itemdiv.setAttribute("class", "UserListStyle");
        itemdiv.id = userid + "_UserDiv";

        // �ж��û�����ͷ״̬
        if (BRAC_GetCameraState(userid) == 0)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "", userid); // �������ͷͼƬ<img>��ǩ
        if (BRAC_GetCameraState(userid) == 1)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_false.png", userid); // �������ͷͼƬ<img>��ǩ
        if (BRAC_GetCameraState(userid) == 2)
            AddImage(itemdiv, userid + "_CameraTag", "CameraTag", "./images/advanceset/camera_true.png", userid); // �������ͷͼƬ<img>��ǩ
        // �жϵ�ǰID�Ƿ�Ϊ�Լ�
        if (userid == mSelfUserId) {
            AddImage(itemdiv, mSelfUserId + "_MicrophoneTag", "mSelfMicrophoneTag", "./images/advanceset/microphone_true.png", userid); // ��ӻ�ͲͼƬ<img>��ǩ
            itemdiv.innerHTML += "&nbsp" + BRAC_GetUserName(mSelfUserId) + "(�Լ�)";
        } else {
            AddImage(itemdiv, userid + "_MicrophoneTag", "MicrophoneTag", "./images/advanceset/microphone_false.png", userid); // ��ӻ�ͲͼƬ<img>��ǩ
            // ����û�����<a>��ǩ
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
//div��ť��껮�뻮��Ч��
function Mouseover(id) {
    GetID(id).style.backgroundColor = "#FFFFCC";
}
//div��ť��껮�뻮��Ч��
function Mouseout(id) {
    GetID(id).style.backgroundColor = "#E6E6E6";
}
//��ȡ��ǰʱ��  (00:00:00)
function GetTheTime() {
    var TheTime = new Date();
    return TheTime.toLocaleTimeString();
}

// �����־����ʾ�����ݲ�ͬ��������ʾ��ͬ����ɫ
function AddLog(message, type) {
    if (type == LOG_TYPE_API) {			// API������־����ɫ
        message = message.fontcolor("Green");
    } else if (type == LOG_TYPE_EVENT) {	// �ص��¼���־����ɫ
        message = message.fontcolor("#CC6600");
    } else if (type == LOG_TYPE_ERROR) {	// ������־����ɫ
        message = message.fontcolor("#FF0000");
    } else {							// ��ͨ��־����ɫ
        message = message.fontcolor("#333333");
    }
    GetID("LOG_DIV_CONTENT").innerHTML += message + "&nbsp" + GetTheTime().fontcolor("#333333") + "<br />";
    DisplayScroll("LOG_DIV_CONTENT");
}

// ��ʾ�ȴ�����������ʾ�û��������ڽ�����
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

//���� ����ͷ  ��Ͳ  ͼ��
function AddImage(parent_id, img_id, img_class, fir_img, userid) {
    var imgs = document.createElement("img");
    imgs.id = img_id;
    imgs.className = img_class;
    imgs.src = fir_img;
    imgs.style.width = "15px";
    imgs.style.height = "15px";
    parent_id.appendChild(imgs);
}
// Ϊ������û���Ͳ��ť��ӵ���¼�
function MicrophoneOnclick(userid) {
    GetID(userid + "_MicrophoneTag").style.cursor = "pointer"; // �����״
    GetID(userid + "_MicrophoneTag").onclick = function () { // ��Ͳ����¼�
        var ImgPath = GetID(userid + "_MicrophoneTag").src.split('/');
        if (ImgPath[ImgPath.length - 1] == "microphone_true.png") {
            GetID(userid + "_MicrophoneTag").src = "./images/advanceset/microphone_false.png";
            BRAC_UserSpeakControl(userid, 0); // �ر�����
        }
        else {
            GetID(userid + "_MicrophoneTag").src = "./images/advanceset/microphone_true.png";
            BRAC_UserSpeakControl(userid, 1); // ��������
        }
    }
}
//�ָ���ʾ��Ƶdiv��С
function reVideoDivSize() {
    var divWidth = GetID("AnyChatRemoteVideoDiv").offsetWidth;
    var divHeight = GetID("AnyChatRemoteVideoDiv").offsetHeight;
    if (divWidth < divHeight) {
        GetID("AnyChatRemoteVideoDiv").style.width = (4.0 / 3 * divHeight) + "px";
        GetID("AnyChatRemoteVideoDiv").style.height = divHeight + "px";
    }
}