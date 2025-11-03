// src/app/contact/metadata.ts

import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://denkizumen.com';

export const contactMetadata: Metadata = {
    title: 'お問い合わせ | 電気回路図シンボルライブラリ', 
    description: 'CADシンボルや技術ブログの内容に関するご質問、その他のお問い合わせはこちらからご連絡ください。',
    openGraph: {
        title: 'お問い合わせ | 電気回路図シンボルライブラリ',
        url: `${baseUrl}/contact`, 
    }
};