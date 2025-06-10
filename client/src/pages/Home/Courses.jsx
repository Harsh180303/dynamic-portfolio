import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'
// import { courses } from '../../resources/courses'

function Courses() {
  const { portfolioData } = useSelector((state) => state.root)
  const { courses } = portfolioData
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)

  return (
    <div>
      <SectionTitle title="Courses" />

      <div className="flex flex-col sm:flex-row py-10 gap-x-5 justify-between">
        <div className="flex mb-10 sm:mb-0 sm:flex-col gap-10 sm:border-l-2 border-gray-600 sm:w-[54%] overflow-x-scroll sm:overflow-auto items-center sm:items-start">
          {courses.map((course, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index)
              }}
              className="cursor-pointer flex-shrink-0"
            >
              <h1
                className={`text-xl pl-5 ${
                  selectedItemIndex === index
                    ? 'text-tertiary border-tertiary border-l-4 ml-[-3px] bg-[#3b83f651] p-3 sm:w-40'
                    : 'text-white'
                }`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Right Content */}

        <div className="flex  flex-col-reverse sm:flex-row gap-10 justify-center items-center">
          <div className="flex flex-col gap-y-5 sm:w-[75%]">
            <h1 className="text-sc text-2xl">
              {courses[selectedItemIndex].title}
            </h1>

            <p className="text-white sm:text-[1.18rem]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laudantium, recusandae? Fugiat mollitia, quia temporibus
              architecto expedita libero omnis quasi earum voluptatibus,
              reiciendis necessitatibus officiis molestiae molestias illum
              corporis eveniet dignissimos voluptas possimus aspernatur
              doloremque quisquam corrupti!
            </p>
          </div>

          <img
            src={courses[selectedItemIndex].image}
            alt=""
            className="h-60 w-72"
          />
        </div>
      </div>
    </div>
  )
}

export default Courses
