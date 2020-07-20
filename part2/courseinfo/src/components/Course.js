import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
}
  
const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
}
  
const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part=><Part key={part.id} part={part} />)}
      </div>
    )
}
  
const Total = ({course}) => {
    return (
      <p><b>Number of exercises {course.parts.reduce((s,v)=>s+v.exercises,0)} </b></p>
    )
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
}

export default Course