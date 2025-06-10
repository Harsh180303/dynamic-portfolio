import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function Contact() {
  const { portfolioData } = useSelector((state) => state.root)
  const { contact } = portfolioData

  return (
    <div>
      <SectionTitle title="Say Hello" />

      <div className=" flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-tertiary sm:text-[1.18rem]">{'{'}</h1>
          {Object.keys(contact).map(
            (key, index) =>
              (key !== '_id' && key !== "updatedAt") && (
                <h1
                  key={index}
                  className="text-tertiary sm:text-[1.18rem] ml-8"
                >
                  <span>{key} : </span>
                  <span>{contact[key]}</span>
                </h1>
              )
          )}
          <h1 className="text-tertiary sm:text-[1.18rem]">{'}'}</h1>
        </div>

        <div className="h-80">
          <dotlottie-player
            src="https://lottie.host/54bd5b78-f47f-4a37-8c3b-06fb5013e610/8pftN8rZpA.lottie"
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  )
}

export default Contact
