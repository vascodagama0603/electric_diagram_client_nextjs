"use client"; //ここにuse clientを追加するだけ
import axios from "axios";
import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import swal from 'sweetalert2';
import { IoMdCloseCircle } from 'react-icons/io'; 
import { Signals } from './signalsData'; 

const base = process.env.NODE_ENV === 'production' ? '/' : '/';
const extSVG ={
  ext : ".svg",
  type: 'image/svg+xml',
  text: 'SVG',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/svg/"
}
const extDXF ={
  ext : ".dxf",
  type: 'image/vnd.dxf',
  text: 'DXF',
  url:process.env.NEXT_PUBLIC_SERVER_URL+"/dxf/"
}

export function SymbolCatalog() {

  const [searchTerm, setSearchTerm] = useState(''); 
  const [pictures, setPictures] = useState(Signals);
  const [hoveredPictureId, setHoveredPictureId] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const [flags, setFlags] = useState({});
  const [selectedPictureId, setSelectedPictureId] = useState(null);

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
      setFlags(prev => ({ ...prev, [picture.id]: true }));
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
    }finally {
      // ★ 修正 3: 完了時またはエラー時に特定のIDのフラグを false に設定 (finallyブロックの使用を推奨)
      setFlags(prev => ({ ...prev, [picture.id]: false }));
    }
  };
  const selectedPicture = selectedPictureId !== null 
    ? pictures.find(p => p.id === selectedPictureId)
    : null;

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

      {selectedPicture && (
          <StyledOverlay onClick={() => setSelectedPictureId(null)}>
            <StyledDescriptionBox onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={() => setSelectedPictureId(null)} title="閉じる">
                    <IoMdCloseCircle size={30} />
                </CloseButton>
                <DescriptionTitle>
                    {selectedPicture.caption} ({selectedPicture.did}) の解説
                </DescriptionTitle>
                <DescriptionContent>
                    {selectedPicture.discription}
                </DescriptionContent>
            </StyledDescriptionBox>
          </StyledOverlay>
      )}
      <StyledImageArea>
        {filteredPictures.map((picture) => (
          <SignalBox
            key={picture.id}
            sx={{ position: "relative" }}
            onClick={() => setSelectedPictureId(picture.id)} 
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
                      onClick={(e) => {
                       e.stopPropagation(); // 親要素のonClickイベントが発火するのを防ぐ
                       downloadDxf(picture,extSVG);
                   }}
                  tabIndex={0}
                >SVG</SvgButton>
                <DxfButton
                onClick={(e) => {
                       e.stopPropagation(); // 親要素のonClickイベントが発火するのを防ぐ
                       downloadDxf(picture,extDXF);
                   }}
                tabIndex={0}
                >DXF</DxfButton>
              </StyledOnImageButton>
            )}
            <StyledComment>{picture.caption}</StyledComment>
            <StyledSubComment>{"図番号 " + picture.did}</StyledSubComment>
            <StyledSubComment>{"識別番号 " + picture.id}</StyledSubComment>
          </SignalBox>
        ))}
      </StyledImageArea>
		</>
	);
}
// 1. オーバーレイ (画面全体を覆う半透明の背景)
const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 黒の半透明 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* 最前面に表示 */
`;

// 2. モーダル本体
const StyledDescriptionBox = styled.div`
    position: relative;
    width: 90%;
    max-width: 700px;
    padding: 30px;
    border-radius: 12px;
    background-color: #ffffff; /* 白の背景 */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    /* 軽くアニメーション */
    transform: scale(1);
    transition: transform 0.3s ease-out;
`;

// 3. 閉じるボタン
const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    color: #a0a0a0;
    padding: 5px;

    &:hover {
        color: #e74c3c; /* ホバーで赤く */
    }
`;

const DescriptionTitle = styled.h3`
    font-size: 1.5rem;
    color: #0056b3;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
    margin-top: 0;
    margin-bottom: 15px;
`;

const DescriptionContent = styled.p`
    font-size: 1rem;
    line-height: 1.7;
    color: #333;
    text-align: justify;
`;
const StyledComment = styled.p`
  font-size: 0.5rem;
  color: #777; /* 薄い色でサブ情報として強調 */
  margin: 4px auto 10px;
`;

const StyledSubComment = styled.p`
  font-size: 0.5rem;
  font-weight: 600; /* 太字にして目立たせる */
  color: #333; /* 濃いめの色 */
  margin: 5px auto 0px;
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

  max-width: 100px;
  height: 100px;
`;

const StyledOnImageButton = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff;
  
`;

const SvgButton = styled.button`
  font-size: 0.8rem;
  width: 30px;
  height: 30px;
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
  border-radius: 6px; /* 角を丸く */
  padding: 10px;
  margin: 5px; /* カード間のスペースを広げる */
  width: 130px; /* 最大幅を固定して整列しやすく */
  text-align: center;
  
  /* アニメーションの追加 */
  transition: all 0.3s ease-in-out;
  
  &:hover {
    box-shadow: 0px 8px 16px rgba(0, 40, 80, 0.1); /* ホバーでより立体的な影 */
    transform: translateY(-7px); /* 持ち上がる効果 */
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