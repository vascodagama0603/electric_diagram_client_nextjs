"use client"; //ここにuse clientを追加するだけ
import axios from "axios";
import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import swal from 'sweetalert2';

import { Signals } from './signalsData'; 

const SERVER = "https://electric-diagram-server.onrender.com"
const base = process.env.NODE_ENV === 'production' ? '/' : '/';
const extSVG ={
  ext : ".svg",
  type: 'image/svg+xml',
  text: 'SVG',
  url:SERVER+"/svg/"
}
const extDXF ={
  ext : ".dxf",
  type: 'image/vnd.dxf',
  text: 'DXF',
  url:SERVER+"/dxf/"
}

//const SERVER = process.env.SERVER_ADDRESS
export function SymbolCatalog() {

  const [searchTerm, setSearchTerm] = useState(''); 
  const [pictures, setPictures] = useState(Signals);
  const [hoveredPictureId, setHoveredPictureId] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const [flags, setFlags] = useState(Array(pictures.length).fill(false));

    const filteredPictures = React.useMemo(() => {
        if (!searchTerm) {
            // 検索ワードがない場合は全件返す
            return pictures;
        }

            return pictures.filter(picture => {
            // 検索フィールド (search) または キャプション (caption) にキーワードが含まれているかチェック
            const searchString = `${picture.search} ${picture.subcaption} ${picture.id}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, pictures]); // searchTerm か pictures が変わった時のみ再計算
  
  //console.log(flags)
  const isHoveredOnPicture = useCallback(
    (pictureId) => {
      if (hoveredPictureId === null) return false;

      return onHover && hoveredPictureId === pictureId;
    },
    [onHover, hoveredPictureId]
  );

  const downloadDxf = async (picture,extType) => {
    try {
      setFlags(prev => prev.map((flag, i) => i === picture.id ? true : flag))
      const response = await axios.get(extType.url+ picture.id, {
        responseType: 'blob', 
      });
      const blob = new Blob([response.data], { type: extType.type });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = picture.id+extType.ext; // The default filename for the download
      document.body.appendChild(link); // Append to the document body
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);

    } catch (error) {
      swal.fire({
        icon: "error",
        title: "通信異常",
        text: "ダウンロードできませんでした",
      });      
      console.error('Error downloading the '+extType+' file:', error);
    }
      setFlags(prev => prev.map((flag, i) => i === picture.id ? false : flag))
  };


	return (
		<>
       <PageTitle>電気シンボル一覧</PageTitle> 
      <SearchInput 
          type="text"
          placeholder="シンボルを検索 (例: a接点, break, 2P)"
          value={searchTerm}
          // 4. 入力時に searchTerm State を更新
          onChange={(e) => setSearchTerm(e.target.value)}
      />
      <StyledImageArea>
        {filteredPictures.map((picture) => (
          <SignalBox
            key={picture.id}
            sx={{ position: "relative" }}
            onMouseEnter={() => {
              setHoveredPictureId(picture.id);
              setOnHover(true);
            }}
            onMouseLeave={() => {
              setHoveredPictureId(null);
              setOnHover(false);
            }}
          >
          {flags[picture.id] && (
            <StyledStatusContainer>
            <Spinner />
            <StatusText>ダウンロード中...</StatusText>
            </StyledStatusContainer>
          )}
            <StyledImage src={base + picture.id +".svg"} />
  
            
            {isHoveredOnPicture(picture.id) && (
              <StyledOnImageButton
              >
                <SvgButton
                  onClick={() => downloadDxf(picture,extSVG)}
                  //onKeyDown={() => handleRemovePicture(picture.id)}
                  tabIndex={0}
                >SVG</SvgButton>
                <DxfButton
                  onClick={() => downloadDxf(picture,extDXF)}
                  //onKeyDown={() => handleRemovePicture(picture.id)}
                  tabIndex={0}
                >DXF</DxfButton>
              </StyledOnImageButton>
            )}
            <StyledComment>{picture.caption}</StyledComment>
            <StyledSubComment>{"図記号番号 " + picture.did}</StyledSubComment>
            <StyledSubComment>{"識別番号 " + picture.id}</StyledSubComment>
          </SignalBox>
        ))}
      </StyledImageArea>
		</>
	);
}

const StyledComment = styled.p`
  font-size: 0.85rem;
  color: #777; /* 薄い色でサブ情報として強調 */
  margin: 4px auto 10px;
`;

const StyledSubComment = styled.p`
  font-size: 1.1rem;
  font-weight: 600; /* 太字にして目立たせる */
  color: #333; /* 濃いめの色 */
  margin: 10px auto 0px;
`;

const StyledImageArea = styled.div`
  /* 既存のレイアウトはそのままに、上下にゆとりを持たせる */
  margin: 2em auto; 
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 10px; /* 画面端に余裕を持たせる */
`;

const StyledImage = styled.img`

  object-fit: contain;
  margin: 10px;

  max-width: 200px;
  height: 200px;
`;

const StyledOnImageButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 15px;
  color: #fff;
  
`;

const SvgButton = styled.button`
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: skyblue;
  border: 2px solid skyblue;
  &:hover {
    background: #fff;
  color: skyblue;
  }
`;

const DxfButton = styled(SvgButton)`
  background: orange;
  border: 2px solid orange;
  &:hover {
    background: #fff;
    color: orange;
  }
  margin-top:5px;
`;

const SignalBox = styled(Box)`
  /* カードとしての視覚的改善 */
  background-color: #ffffff; /* 背景を白に設定 */
  border: 1px solid #e0e0e0; /* 薄い境界線 */
  border-radius: 12px; /* 角を丸く */
  padding: 10px;
  margin: 15px; /* カード間のスペースを広げる */
  width: 250px; /* 最大幅を固定して整列しやすく */
  text-align: center;
  
  /* アニメーションの追加 */
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 40, 80, 0.1); /* ホバーでより立体的な影 */
    transform: translateY(-5px); /* 持ち上がる効果 */
    border-color: #007bff; /* ホバーで主要な色に */
  }
`;




const PageTitle = styled.h2`
    font-size: 2rem;
    color: #333;
    margin: 10px 0 20px 0; /* マージンを調整 */
    border-bottom: 3px solid #007bff;
    padding-bottom: 5px;
`;
const SearchInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin-bottom: 25px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1.1rem;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
        border-color: #007bff; /* フォーカス時に青く強調 */
    }
`;

const StyledStatusContainer = styled.div`
  /* 絶対配置で親要素（SignalBox）全体を覆う */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* 半透明の背景 */
  background: rgba(255, 255, 255, 0.9);
  
  /* コンテンツを中央に配置 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* その他のコンテンツより手前に表示 */
  z-index: 10;
  
  /* スムーズな表示/非表示のためのトランジション */
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  border-radius: 12px; /* SignalBoxの角丸と合わせる */
`;

// 2. ローディングスピナー (アニメーション)
const Spinner = styled.div`
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #007bff; /* Primary Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite; /* 1秒で無限に回転 */
  margin-bottom: 10px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 3. ステータスを示すテキスト
const StatusText = styled.div`
  color: #007bff;
  font-size: 0.9rem;
  font-weight: 600;
`;