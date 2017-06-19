// AnyChat for Web SDK

/********************************************
 *				�¼��ص�����				*
 *******************************************/

// �첽��Ϣ֪ͨ���������ӷ���������¼ϵͳ�����뷿�����Ϣ
function OnAnyChatNotifyMessage(dwNotifyMsg, wParam, lParam) {
    switch (dwNotifyMsg) {
        case WM_GV_CONNECT: OnAnyChatConnect(wParam, lParam); break;
        case WM_GV_LOGINSYSTEM: OnAnyChatLoginSystem(wParam, lParam); break;
        case WM_GV_ENTERROOM: OnAnyChatEnterRoom(wParam, lParam); break;
        case WM_GV_ONLINEUSER: OnAnyChatRoomOnlineUser(wParam, lParam); break;
        case WM_GV_USERATROOM: OnAnyChatUserAtRoom(wParam, lParam); break;
        case WM_GV_LINKCLOSE: OnAnyChatLinkClose(wParam, lParam); break;
        case WM_GV_MICSTATECHANGE: OnAnyChatMicStateChange(wParam, lParam); break;
        case WM_GV_CAMERASTATE: OnAnyChatCameraStateChange(wParam, lParam); break;
        case WM_GV_P2PCONNECTSTATE: OnAnyChatP2PConnectState(wParam, lParam); break;
        case WM_GV_PRIVATEREQUEST: OnAnyChatPrivateRequest(wParam, lParam); break;
        case WM_GV_PRIVATEECHO: OnAnyChatPrivateEcho(wParam, lParam); break;
        case WM_GV_PRIVATEEXIT: OnAnyChatPrivateExit(wParam, lParam); break;
        case WM_GV_USERINFOUPDATE: OnAnyChatUserInfoUpdate(wParam, lParam); break;
        case WM_GV_FRIENDSTATUS: OnAnyChatFriendStatus(wParam, lParam); break;
        case WM_GV_VIDEOSIZECHG: OnAnyChatVideoSizeChange(wParam, lParam); break;
        default:
            break;
    }
}


// �յ�������Ϣ
function OnAnyChatTextMessage(dwFromUserId, dwToUserId, bSecret, lpMsgBuf, dwLen) {
    DisplayTextMessage(dwFromUserId, lpMsgBuf);
}

// �յ�͸��ͨ����������
function OnAnyChatTransBuffer(dwUserId, lpBuf, dwLen) {

}

// �յ�͸��ͨ������չ����������
function OnAnyChatTransBufferEx(dwUserId, lpBuf, dwLen, wParam, lParam, dwTaskId) {

}

// �ļ��������֪ͨ
function OnAnyChatTransFile(dwUserId, lpFileName, lpTempFilePath, dwFileLength, wParam, lParam, dwTaskId) {

}

// ϵͳ�����ı�֪ͨ
function OnAnyChatVolumeChange(device, dwCurrentVolume) {

}

var roomId = 0;
// �յ����������͵�SDK Filter����
function OnAnyChatSDKFilterData(lpBuf, dwLen) {
   // alert(lpBuf);
    roomId = lpBuf;
    BRAC_EnterRoom(roomId, "", 0);

}

// �յ�¼�����������¼�
function OnAnyChatRecordSnapShot(dwUserId, lpFileName, dwParam, bRecordType) {

}

// �յ�¼�����������¼�����չ��
function OnAnyChatRecordSnapShotEx(dwUserId, lpFileName, dwElapse, dwFlags, dwParam, lpUserStr) {

}


/********************************************
 *		AnyChat SDK����ҵ������				*
 *******************************************/

// �ͻ������ӷ�������bSuccess��ʾ�Ƿ����ӳɹ���errorcode��ʾ�������
function OnAnyChatConnect(bSuccess, errorcode) {
    //alert( errorcode );
    if (errorcode == 0) {
        //alert("Loading");
        BRAC_SetVideoPos(0, GetID("AnyChatLocalVideoDiv"), "ANYCHAT_VIDEO_LOCAL");
        BRAC_SetVideoPos(0, GetID("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
        Login();
    }
    else {
        DisplayLoadingDiv(false);
    }
}

// �ͻ��˵�¼ϵͳ��dwUserId��ʾ�Լ����û�ID�ţ�errorcode��ʾ��¼�����0 �ɹ�������Ϊ������룬�ο�������붨��
function OnAnyChatLoginSystem(dwUserId, errorcode) {
    //DisplayLoadingDiv(false);
    //AddLog("OnAnyChatLoginSystem(userid=" + dwUserId + ", errorcode=" + errorcode + ")", LOG_TYPE_EVENT);
    if (errorcode == 0) {
        //ConfigAnyChatParameter();
        // alert("EnterRoom");
        mSelfUserId = dwUserId;
        sendMeetingId();
        //var roomId = BRAC_GetUserInfo(dwUserId, 1);

       // BRAC_EnterRoom(roomId, "", 0);
        //ShowHallDiv(true);
    } else {
        //ShowHallDiv(false);
    }
}

// �ͻ��˽��뷿�䣬dwRoomId��ʾ�����뷿���ID�ţ�errorcode��ʾ�Ƿ���뷿�䣺0�ɹ����룬����Ϊ�������
function OnAnyChatEnterRoom(dwRoomId, errorcode) {
    // DisplayLoadingDiv(false);
    // AddLog("OnAnyChatEnterRoom(roomid=" + dwRoomId + ", errorcode=" + errorcode + ")", LOG_TYPE_EVENT);
    //alert(errorcode);
    if (errorcode == 0) {
        // ShowRoomDiv(true);
        //RoomUserListControl(mSelfUserId, true);		// ���Լ������û��б�
        //  alert("OpenVideo");
        BRAC_UserCameraControl(mSelfUserId, 1); 	// �򿪱�����Ƶ
        BRAC_UserSpeakControl(mSelfUserId, 1); 		// �򿪱�������

        //ShowNotifyMessage("Welcome use AnyChat, successfully enter the room:" + dwRoomId, NOTIFY_TYPE_SYSTEM);
        // ���ñ�����Ƶ��ʾλ��
        BRAC_SetVideoPos(mSelfUserId, GetID("AnyChatLocalVideoDiv"), "ANYCHAT_VIDEO_LOCAL");
        // ����Զ����Ƶ��ʾλ�ã�û�й������û���ֻ��ռλ�ã�
        //  BRAC_SetVideoPos(0, GetID("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");

        //mRefreshVolumeTimer = setInterval(function () {
        //    GetID("LocalAudioVolume").style.width = GetID("AnyChatLocalVideoDiv").offsetHeight * BRAC_QueryUserStateInt(mSelfUserId, BRAC_USERSTATE_SPEAKVOLUME) / 100 + "px";
        //	if(mTargetUserId != -1)
        //		GetID("RemoteAudioVolume").style.width = GetID("AnyChatRemoteVideoDiv").offsetHeight * BRAC_QueryUserStateInt(mTargetUserId, BRAC_USERSTATE_SPEAKVOLUME) / 100 + "px";
        //	else
        //		GetID("RemoteAudioVolume").style.width = "0px";
        //}, 100);
    } else {

    }
}

// �յ���ǰ����������û���Ϣ�����뷿��󴥷�һ�Σ�dwUserCount��ʾ�����û����������Լ�����dwRoomId��ʾ����ID
function OnAnyChatRoomOnlineUser(dwUserCount, dwRoomId) {
    // AddLog("OnAnyChatRoomOnlineUser(count=" + dwUserCount + ", roomid=" + dwRoomId + ")", LOG_TYPE_EVENT);
    var useridlist = BRAC_GetOnlineUser();
    // ��������һ���û�������Ƶ
    for (var k = 0; k < useridlist.length; k++) {
        if (useridlist[k] == mSelfUserId)
            continue;
        var role = BRAC_QueryUserStateInt(useridlist[k], BRAC_USERSTATE_LEVEL);
        if (role != 9) {
            RequestOtherUserVideo(useridlist[k]);
        }
        break;
    }
}

// �û����루�뿪�����䣬dwUserId��ʾ�û�ID�ţ�bEnterRoom��ʾ���û��ǽ��루1�����뿪��0������
function OnAnyChatUserAtRoom(dwUserId, bEnterRoom) {
    if (bEnterRoom == 1) {

        var flag = BRAC_QueryUserStateInt(dwUserId, BRAC_USERSTATE_LEVEL);
        if (flag == 9) {

        }
        else {
            RequestOtherUserVideo(dwUserId);
        }
    }
    else {

        BRAC_SetVideoPos(0, GetID("AnyChatRemoteVideoDiv"), "ANYCHAT_VIDEO_REMOTE");
        setMsg();
    }


}

// ���������ѹرգ�����Ϣֻ���ڿͻ������ӷ������ɹ�֮�������쳣�ж�֮ʱ������reason��ʾ���ӶϿ���ԭ��
function OnAnyChatLinkClose(reason, errorcode) {

}

// �û�����Ƶ�豸״̬�仯��Ϣ��dwUserId��ʾ�û�ID�ţ�State��ʾ���û��Ƿ��Ѵ���Ƶ�ɼ��豸��0���رգ�1���򿪣�
function OnAnyChatMicStateChange(dwUserId, State) {

}

// �û�����ͷ״̬�����仯��dwUserId��ʾ�û�ID�ţ�State��ʾ����ͷ�ĵ�ǰ״̬��0��û������ͷ��1��������ͷ��û�д򿪣�2���򿪣�
function OnAnyChatCameraStateChange(dwUserId, State) {


}

// �����û��������û���P2P��������״̬�����仯��dwUserId��ʾ�����û�ID�ţ�State��ʾ�����û��������û��ĵ�ǰP2P��������״̬��0��û�����ӣ�1����TCP���ӣ�2����UDP���ӣ�3��TCP��UDP���ӣ�
function OnAnyChatP2PConnectState(dwUserId, State) {

}

// �û�����˽������dwUserId��ʾ�����ߵ��û�ID�ţ�dwRequestId��ʾ˽�������ţ���ʶ������
function OnAnyChatPrivateRequest(dwUserId, dwRequestId) {

}

// �û��ظ�˽������dwUserId��ʾ�ظ��ߵ��û�ID�ţ�errorcodeΪ�������
function OnAnyChatPrivateEcho(dwUserId, errorcode) {

}

// �û��˳�˽�ģ�dwUserId��ʾ�˳��ߵ��û�ID�ţ�errorcodeΪ�������
function OnAnyChatPrivateExit(dwUserId, errorcode) {

}

// ��Ƶͨ����Ϣ֪ͨ�ص�����
function OnAnyChatVideoCallEvent(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {


}

// �û���Ϣ����֪ͨ��dwUserId��ʾ�û�ID�ţ�dwType��ʾ�������
function OnAnyChatUserInfoUpdate(dwUserId, dwType) {

}

// ��������״̬�仯��dwUserId��ʾ�����û�ID�ţ�dwStatus��ʾ�û��ĵ�ǰ�״̬��0 ���ߣ� 1 ����
function OnAnyChatFriendStatus(dwUserId, dwStatus) {


}

// �û���Ƶ�ֱ��ʷ����仯��dwUserId��INT����ʾ�û�ID�ţ�dwResolution��INT����ʾ�û�����Ƶ�ֱ������ֵ����16λ��ʾ��ȣ���16λ��ʾ�߶ȣ�
function OnAnyChatVideoSizeChange(dwUserId, dwResolution) {

}

