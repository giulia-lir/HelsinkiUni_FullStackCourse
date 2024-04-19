const Course = ( {course} ) => {
    
    const Header = ( {name} ) => <h1>{name}</h1>
    const Content = ( {parts} ) => parts.map(part => <Part key={part.id} part={part} />)
    const Part = ( {part} ) => <p>{part.name} {part.exercises}</p> 

    return(
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course