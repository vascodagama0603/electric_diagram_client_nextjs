// src/app/components/SymbolCatalog.tsx
"use client";
import axios from "axios";
import { Signals } from '../../lib/data/signalsData'; 
import React, { useCallback, useState ,useMemo} from "react";
import swal from 'sweetalert2';
import { IoMdCloseCircle } from 'react-icons/io'; 

import { PageTitle, SearchInput, StyledImageArea, SignalBox,
  StyledOverlay,StyledDescriptionBox,CloseButton,DescriptionTitle,
  DescriptionContent,NotFoundMessage,StyledStatusContainer,
  Spinner,StatusText,StyledImage,StyledOnImageButton,SvgButton,DxfButton,
  StyledComment,StyledSubComment
} from '../../styles/GeneralStyles';


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

interface Picture {
    id: string;
    caption: string;
    subcaption: string;
    did: string;
    discription: string; 
    search: string; 
}
interface FileExtensionType {
    ext: string;
    type: string;
    text: string;
    url: string;
}


export function SymbolCatalog() : React.JSX.Element {

  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [pictures, setPictures] = useState<Picture[]>(Signals as Picture[]);
  const [hoveredPictureId, setHoveredPictureId] = useState<string | null>(null);
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [selectedPictureId, setSelectedPictureId] = useState<string | null>(null);

  const [downloadScale, setDownloadScale] = useState<number>(1.0);
  const [downloadVertical, setDownloadVertical] = useState<boolean>(false);

  const filteredPictures = useMemo(() => {
        if (!searchTerm) {
            return pictures;
        }

        return pictures.filter(picture => {
            const searchString = `${picture.search} ${picture.subcaption} ${picture.id}`.toLowerCase();
            return searchString.includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, pictures]); 

  const isHoveredOnPicture = useCallback(
    (pictureId: string): boolean => {
      if (hoveredPictureId === null) return false;
          return hoveredPictureId === pictureId;
      },
        [hoveredPictureId]
  );

  const downloadContents = async (picture: Picture, extType: FileExtensionType) => {
    try {
        setFlags(prev => ({ ...prev, [picture.id]: true }));

        const params = new URLSearchParams();
        if (downloadScale !== 1.0) {
            params.append('scale', downloadScale.toString());
        }

        if (downloadVertical) {
            params.append('vertical', 'True');
        }

        const queryString = params.toString();
        const url = extType.url + picture.id + (queryString ? `?${queryString}` : '');
        console.log("URL:",url)
        const response = await axios.get(url, {
            responseType: 'blob', 
        });
        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}`);
        }
        const blob = new Blob([response.data], { type: extType.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = picture.id + extType.ext; 
        document.body.appendChild(link);
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
            setFlags(prev => ({ ...prev, [picture.id]: false }));
        }
  };
  const selectedPicture = useMemo(() => {
    return selectedPictureId !== null 
        ? pictures.find(p => p.id === selectedPictureId)
        : null;
  }, [selectedPictureId, pictures]);

	return (
		<>
            <PageTitle>電気シンボル一覧</PageTitle> 
            <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <label style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>ダウンロード設定:</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                スケール (x): 
                <input
                    type="number"
                    value={downloadScale}
                    onChange={(e) => setDownloadScale(parseFloat(e.target.value) || 1.0)}
                    min="0.1"
                    step="0.1"
                    style={{ width: '80px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                垂直出力(OFFで水平出力):
                <input
                    type="checkbox"
                    checked={downloadVertical}
                    onChange={(e) => setDownloadVertical(e.target.checked)}
                    style={{ width: '20px', height: '20px' }}
                />
            </label>
            </div>
      <SearchInput 
          type="text"
          placeholder="シンボルを検索 (例: a接点, break, 2P)"
          value={searchTerm}
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
    {filteredPictures.length === 0 && searchTerm !== '' ? (
        <NotFoundMessage>
            「{searchTerm}」に一致するシンボルは見つかりませんでした。
            <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '10px' }}>
                検索ワードを変更してお試しください。
            </p>
        </NotFoundMessage>
    ) : (
        <StyledImageArea>
            {filteredPictures.map((picture) => (
                <SignalBox
                    key={picture.id}
                    sx={{ position: "relative" }}
                    onClick={() => setSelectedPictureId(picture.id)} 
                    onMouseEnter={() => {
                        setHoveredPictureId(picture.id);
                    }}
                    onMouseLeave={() => {
                        setHoveredPictureId(null);
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
                        <StyledOnImageButton>
                            <SvgButton
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    downloadContents(picture,extSVG);
                                }}
                                tabIndex={0}
                            >SVG</SvgButton>
                            <DxfButton
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    downloadContents(picture,extDXF);
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
    )}
		</>
	);
}