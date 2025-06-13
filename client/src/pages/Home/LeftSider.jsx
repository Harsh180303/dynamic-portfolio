import React from 'react'

function LeftSider() {
  return (
    <div className="sm:fixed sm:left-0 sm:bottom-0 px-10 static sm:block">
      <div className="flex flex-col items-center">
        <div className="flex-row sm:flex-col text-[1.3rem] sm:text-xl text-gray-600 gap-3 inline-flex py-4 w-full justify-between">
          <a
            href="https://mail.google.com/mail/?view=cm&to=harsh.180303@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-mail-fill cursor-pointer hover:text-white"></i>
          </a>

          <a
            href="https://github.com/Harsh180303"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill cursor-pointer hover:text-white"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/harsh-chourasiya18"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-box-fill cursor-pointer hover:text-white"></i>
          </a>
          <a
            href="https://x.com/Harsh_18_03_03?t=2RJa35cCI0h92BEMP9IqmA&s=09"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-twitter-fill cursor-pointer hover:text-white"></i>
          </a>
          <a
            href="https://www.instagram.com/harsh_chourasiya1/profilecard/?igsh=MXExMWExN2NlNGtyNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-instagram-fill cursor-pointer hover:text-white"></i>
          </a>
        </div>

        <div className="hidden sm:block w-[1px] h-32 bg-gray-600 opacity-70"></div>
      </div>
    </div>
  )
}

export default LeftSider
