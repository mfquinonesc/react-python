import Form from "../../components/Form/Form";

export default function Login() {
  return (
    <section className="hero is-fullheight is-warning">
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4 is-offset-4">
              <Form route="/api/token/" method="login" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
