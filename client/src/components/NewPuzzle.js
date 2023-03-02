import React, { useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export default function NewPuzzle() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 9/16 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files);

      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      setImage(imageDataUrl)
    }
  }

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} accept="image/*" />
      </div>
      <div>
        {image && 
          <ReactCrop 
            src={image} 
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        }
        
      </div>
    </div>
  )
}




