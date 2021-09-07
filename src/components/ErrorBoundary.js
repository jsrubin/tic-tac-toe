import React from "react";
import Layout from "./Layout";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
  }

  render() {
    if (this.state.hasError) {
      return <Layout title="Whoops, something went wrong" />;
    }

    return this.props.children;
  }
}
