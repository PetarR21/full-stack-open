const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Part = ({ name, exercises }) => (
  <li style={{ marginBottom: '10px' }}>
    {name} {exercises}
  </li>
);

const Content = ({ parts }) => {
  return (
    <ul style={({ listStyle: 'none' }, { paddingLeft: 0 })}>
      {parts.map((part) => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </ul>
  );
};

const Total = ({ exercises }) => {
  const total = exercises.reduce((prev, current) => prev + current, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  );
};

export default Course;
