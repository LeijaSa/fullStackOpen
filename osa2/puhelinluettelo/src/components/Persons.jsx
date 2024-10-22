const Button = (props) => (
  <button style={{ margin: "5px" }} onClick={props.handleClick}>
    {props.text}
  </button>
);

const Persons = ({ personsToShow, deletePerson }) => (
  <div>
    {personsToShow.map(({ name, number, id }) => (
      <p key={name}>
        {name} {number}
        <Button
          text={`Delete ${name}`}
          handleClick={() => deletePerson(id, name)}
        />
      </p>
    ))}
  </div>
);

export default Persons;
