import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

export default function Profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData,  setFormData] = useState({})
  // console.log(formData);
  // console.log(filePerc);
  // console.log(fileUploadError);

  //firebase storage
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / 
        snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
        setFormData({ ...formData, avatar: downloadURL });
      });
    });
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <div className='bg-slate-300 p-8 shadow-md rounded-md'>
        <form className='flex flex-col gap-4'>
          <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>

          <div className='flex-row items-end relative inline-block mx-auto'>
            <img src={formData.avatar || currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
            <img onClick={()=> fileRef.current.click()} src='https://www.freeiconspng.com/thumbs/edit-icon-png/edit-new-icon-22.png' 
            className='absolute bottom-0 right-0 h-5 w-5 object-cover cursor-pointer' />
          </div>

          <p className='text-sm self-center'>
            { fileUploadError ? (
              <span className='text-red-700'>Error Image upload (image must be less than 2 mb)</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-slate-700'> {`Uploading ${filePerc}%`} </span>
            ) : filePerc === 100 ? (
              <span className='text-green-600'>Image successfully uploaded!</span> 
            ) : ('')
            }
          </p>

          <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'  />
          <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'  />
          <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'  />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete account</span>
          <span className='text-red-700 cursor-pointer'>Sign out</span>
        </div>
      </div>
    </div>
  )
}
