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
    if (errorcode == 0) {
        BRAC_SetVideoPos(0, GetID("AnyChatPersonVideoDiv"), "ANYCHAT_VIDEO_Person");
        BRAC_SetVideoPos(0, GetID("AnyChatEmployerVideoDiv"), "ANYCHAT_VIDEO_Employer");
        Login();
    }
}

// �ͻ��˵�¼ϵͳ��dwUserId��ʾ�Լ����û�ID�ţ�errorcode��ʾ��¼�����0 �ɹ�������Ϊ������룬�ο�������붨��
function OnAnyChatLoginSystem(dwUserId, errorcode) {
    if (errorcode == 0) {
        mSelfUserId = dwUserId;
        sendMeetingId();
    } else {
    }
}

// �ͻ��˽��뷿�䣬dwRoomId��ʾ�����뷿���ID�ţ�errorcode��ʾ�Ƿ���뷿�䣺0�ɹ����룬����Ϊ�������
function OnAnyChatEnterRoom(dwRoomId, errorcode) {
    if (errorcode == 0) {
        //BRAC_SetVideoPos(0, GetID("AnyChatPersonVideoDiv"), "ANYCHAT_VIDEO_Person");
        //BRAC_SetVideoPos(0, GetID("AnyChatEmployerVideoDiv"), "ANYCHAT_VIDEO_Employer");
    }
    else {

    }
}

// �յ���ǰ����������û���Ϣ�����뷿��󴥷�һ�Σ�dwUserCount��ʾ�����û����������Լ�����dwRoomId��ʾ����ID
function OnAnyChatRoomOnlineUser(dwUserCount, dwRoomId) {
    var useridlist = BRAC_GetOnlineUser();
    // ��������һ���û�������Ƶ
    for (var k = 0; k < useridlist.length; k++) {
        if (useridlist[k] == mSelfUserId)
            continue;
        var role = BRAC_QueryUserStateInt(useridlist[k], BRAC_USERSTATE_LEVEL);
        if (role == 3) {
            RequestEmployerVideo(useridlist[k]);
        }
        else if (role == 2) {
            RequestPersonVideo(useridlist[k])
        }
        // break;
    }
}

// �û����루�뿪�����䣬dwUserId��ʾ�û�ID�ţ�bEnterRoom��ʾ���û��ǽ��루1�����뿪��0������
function OnAnyChatUserAtRoom(dwUserId, bEnterRoom) {
    if (bEnterRoom == 1) {

        var flag = BRAC_QueryUserStateInt(dwUserId, BRAC_USERSTATE_LEVEL);
        if (flag == 3) {
            RequestEmployerVideo(dwUserId);
        }
        else if (flag == 2) {
            RequestPersonVideo(dwUserId)
        }
    }
    else {

        BRAC_UserCameraControl(dwUserId, 0);
        BRAC_UserSpeakControl(dwUserId, 0);

        var flag = BRAC_QueryUserStateInt(dwUserId, BRAC_USERSTATE_LEVEL);
        if (flag == 2) {
            BRAC_SetVideoPos(0, GetID("AnyChatPersonVideoDiv"), "ANYCHAT_VIDEO_Person");
        }
        else if (flag == 3) {
            BRAC_SetVideoPos(0, GetID("AnyChatEmployerVideoDiv"), "ANYCHAT_VIDEO_Employer");
        }


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

