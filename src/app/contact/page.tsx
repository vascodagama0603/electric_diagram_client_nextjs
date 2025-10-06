// app/contact/page.tsx

"use client";
import { StyledContentContainer } from '../components/ContentStyles';
import styled from "@emotion/styled";
import { useState } from 'react'; // ★ useStateを追加

const CenteredContent = styled.div`
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
`;

// メールリンク/コピーボタン用のスタイル
const MailActionArea = styled.div`
    margin-top: 30px;
    margin-bottom: 20px;
`;

// メールリンクのスタイル
const MailLink = styled.a`
    display: block;
    font-size: 1.2rem;
    font-weight: bold;
    word-break: break-all;
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover {
        color: #0056b3;
    }
`;

// コピーボタンのスタイル
const CopyButton = styled.button`
    padding: 8px 20px;
    background-color: #6c757d; /* グレー */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #5a6268;
    }
`;

// メッセージ表示エリアのスタイル
const Message = styled.div<{ isError?: boolean }>`
    color: ${props => props.isError ? 'red' : 'green'};
    margin-top: 10px;
    font-size: 0.9rem;
`;


export default function ContactPage() {
    // 実際に使用するメールアドレスを設定してください
    const emailAddress = "contact@denkizumen.com"; 
    const mailtoLink = `mailto:${emailAddress}?subject=電気回路図シンボルライブラリに関するお問い合わせ`;

    const [copyMessage, setCopyMessage] = useState('');

    const handleCopy = () => {
        if (!navigator.clipboard) {
            // navigator.clipboard がサポートされていない古いブラウザの場合
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
        <StyledContentContainer>
            <CenteredContent>
                <h2>お問い合わせ</h2>
                <p>
                    CADシンボルに関するご質問、サイトの内容に関するご指摘、その他のお問い合わせは、以下の方法でご連絡ください。
                </p>
                
                <MailActionArea>
                    <p style={{ fontWeight: 'bold' }}>メールアドレス：</p>
                    
                    {/* 1. メールアプリ起動用リンク */}
                    <MailLink href={mailtoLink}>
                        {emailAddress}
                    </MailLink>

                    {/* 2. メールアドレスコピーボタン */}
                    <CopyButton onClick={handleCopy}>
                        メールアドレスをコピー
                    </CopyButton>

                    {/* コピー完了メッセージ */}
                    {copyMessage && <Message isError={copyMessage.includes('失敗')}>
                        {copyMessage}
                    </Message>}
                </MailActionArea>

                <p style={{marginTop: '40px', color: '#666'}}>
                    ※返信には数日いただく場合がございます。あらかじめご了承ください。
                </p>
            </CenteredContent>
        </StyledContentContainer>
    );
}