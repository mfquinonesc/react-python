import Form from "../../components/Form/Form";

export default function Register() {
  return (
    <section className="hero is-fullheight is-warning">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <Form route="/api/user/register/" method="register" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
