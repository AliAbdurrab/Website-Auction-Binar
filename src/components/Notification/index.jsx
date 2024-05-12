import React, { useState } from 'react';
import { Button, Toast } from 'react-bootstrap';
import { ToastModifier, ToastHeader, ToastTextBold, ToastTextSmall } from './NotifToastElement';


function NotificationToast() {
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);
    return (
        <>
            <Button onClick={toggleShowA} className="mb-2">
                Toggle Toast <strong>with</strong> Animation
            </Button>
            <ToastModifier show={showA} onClose={toggleShowA}>
                <ToastHeader>
                    <svg width={20} height={20} className="rounded me-2">
                        <rect width={20} height={20}/>
                    </svg>
                    <ToastTextBold className="me-auto">Bootstrap</ToastTextBold>
                    <ToastTextSmall>11 mins ago</ToastTextSmall>
                </ToastHeader>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </ToastModifier>
        </>
    )
}

export default NotificationToast;