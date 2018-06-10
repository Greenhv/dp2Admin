import React from 'react';
import DropZone from 'react-dropzone';
import PropTypes from 'prop-types';

const CustomDropZone = ({ name, input, meta, ...props }) => {
  const files = Array.isArray(input.value) ? input.value : [{
    preview: input.value,
    name: 'logo',
  }];

  return (
    <div>
      <DropZone
        name={name}
        onDrop={(filesToUpload, e) => input.onChange(filesToUpload)}
        inputProps={{...props}}
      >
        { files && files.length > 0 ? (
          files.map((file, index) => ( <img key={index} src={file.preview} alt={file.name} style={{ maxHeight: '195px', maxWidth: '195px' }} /> ))
        ) : (
          <div>Arrastre la imagen que desea subir o de click en la caja para seleccionar un archivo</div>
        ) } 
      </DropZone>
      {meta.touched && meta.error && (
        <span>{meta.error}</span>
      )}
    </div>
  )
}

CustomDropZone.propTypes = {
  input: PropTypes.shape({}),
  meta: PropTypes.shape({}),
  name: PropTypes.string,
};

export default CustomDropZone;