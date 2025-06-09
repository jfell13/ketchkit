import React from "react";
import "miew/dist/miew.min.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { Editor } from "ketcher-react";
import { Ketcher } from "ketcher-core";
import "ketcher-react/dist/index.css";
import Miew from "miew";
(window as any).Miew = Miew;

const structServiceProvider = new StandaloneStructServiceProvider();

export class KetcherBox extends React.Component<{ onKetcherInit?: (ketcher: Ketcher) => void }> {
  ketcher: Ketcher;
  handleOnInit = async (ketcher: Ketcher) => {
    this.ketcher = ketcher;
    (window as any).ketcher = ketcher;

    // ✅ Pass instance back to parent
    if (this.props.onKetcherInit) {
      this.props.onKetcherInit(ketcher);
    }
  };

  render() {
    return (
      <div className="ketcher-box">
        <Editor
          errorHandler={(message: string) => {
            console.error("Ketcher error:", message);
            alert("Ketcher error: " + message);
          }}
          staticResourcesUrl="/"
          structServiceProvider={structServiceProvider}
          onInit={this.handleOnInit}
        />
      </div>
    );
  }
}
export default KetcherBox;