import React, { FC } from 'react';
// @ts-ignore
import { RViewer, RViewerTrigger } from 'react-viewerjs';

/**
 * 预览图片
 */

interface IProps {
  imageUrls: string[];
}

const PreViewImg: FC<IProps> = ({ imageUrls }) => {
  const options = {
    toolbar: {
      // 单张图片预览不要prev和next底部按钮，隐藏它
      prev: imageUrls.length > 1,
      next: imageUrls.length > 1,
    },
  };

  return (
    <RViewer options={options} imageUrls={imageUrls}>
      {imageUrls.map((url, idx) => {
        const key = idx + 1;
        if (idx < 3) {
          return (
            <RViewerTrigger key={key} index={idx}>
              <img
                src={url}
                alt="img"
                style={{ width: 50, marginRight: 5, verticalAlign: 'middle' }}
              />
            </RViewerTrigger>
          );
        }
        return null;
      })}
    </RViewer>
  );
};

export default PreViewImg;
