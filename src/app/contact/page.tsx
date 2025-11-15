// app/contact/page.tsx

"use client";
import { StyledContentContainer } from '../components/ContentStyles';
import { PageLayout } from '../components/LayoutComponents'; 
import { CenteredContent, MailActionArea,  CopyButton, Message } from '../../styles/GeneralStyles'; 
import React, { useState } from 'react';


export default function ContactPage() {
    const emailAddress = "contact@denkizumen.com"; 

    const [copyMessage, setCopyMessage] = useState('');

    const handleCopy = () => {
        if (!navigator.clipboard) {
            setCopyMessage('ブラウザがコピー機能をサポートしていません。手動でコピーしてください。');
            return;
        }

        navigator.clipboard.writeText(emailAddress)
            .then(() => {
                setCopyMessage('✅ メールアドレスをコピーしました！');
                setTimeout(() => setCopyMessage(''), 3000);
            })
            .catch(err => {
                setCopyMessage('コピーに失敗しました。手動でコピーしてください。');
                console.error('Copy failed:', err);
            });
    };

    return (
        <PageLayout>
            <StyledContentContainer>
                <CenteredContent>
                    <h2>お問い合わせ</h2>
                    <p>
                        CADシンボルに関するご質問、サイトの内容に関するご指摘、その他のお問い合わせは、以下の方法でご連絡ください。
                    </p>
                    
                    <MailActionArea>
                        <p style={{ fontWeight: 'bold' }}>メールアドレス：{emailAddress}</p>
                        
                        <CopyButton onClick={handleCopy}>
                            メールアドレスをコピー
                        </CopyButton>

                        {copyMessage && 
                            <Message color={copyMessage.includes('失敗') ? 'error' : 'success'}>
                                {copyMessage}
                            </Message>
                        }
                    </MailActionArea>

                    <p style={{marginTop: '40px', color: '#666'}}>
                        ※返信には数日いただく場合がございます。あらかじめご了承ください。
                    </p>
                </CenteredContent>
            </StyledContentContainer>
        </PageLayout>
    );
}