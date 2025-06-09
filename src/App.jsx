import React, { useState, useEffect } from 'react';
import initRDKitModule from '@rdkit/rdkit';
import KetcherBox from './ketcher-component.tsx';
import 'ketcher-react/dist/index.css'
import ketcherLogo from './assets/Ketcher_logo.png'
import rdkitjsLogo from './assets/rdkitjs_logo.png'
import './App.css'

function App() {
  const [ketcher, setKetcher] = useState(null);
  const [RDKit, setRDKit] = useState(null); 
  const [descriptorData, setDescriptorData] = useState(null);
  const [printOut, setPrintOut] = useState(null);
  const [mol, setMol] = useState(null);

  useEffect(() => {
    const loadRDKit = async () => {
      const RDKitModule = await initRDKitModule({
        locateFile: () => '/RDKit_minimal.wasm',
      });
      setRDKit(RDKitModule);
      console.log("RDKit.js loaded:", RDKitModule.version());
    };
    loadRDKit();
  }, []);

  const handleExtract = async () => {
    console.log("Ketcher:", ketcher);
    console.log("RDKit:", RDKit);

    if (!ketcher || !RDKit) {
      alert("Ketcher or RDKit not loaded.");
      return;
    }
    const smiles = await ketcher.getSmiles();
    const mol = RDKit.get_mol(smiles);
    setMol(mol);
    const descriptors = JSON.parse(mol.get_descriptors());
    setDescriptorData(descriptors);
    const logP = descriptors.CrippenClogP;
    const mr = descriptors.CrippenMR;
    const output = `SMILES: ${smiles}\nLogP: ${logP}\nMR: ${mr}`;
    setPrintOut(output);
    // alert(output);
  };

  const downloadMol = () => {
    const molH = mol.add_hs();
    const blob = new Blob([molH], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ketcher.mol';
    link.click();
    URL.revokeObjectURL(url);
  }

  const downloadDescription = () => {
    const blob = new Blob([JSON.stringify(descriptorData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mol-description.json';
    link.click();
    URL.revokeObjectURL(url);
  }

  function Actions({onExtract,onMol,onDescr}) {
    return (
      <div className="actions">
        {/* <h3>Actions</h3> */}
        <button onClick={onExtract}>Calculate!</button>
        
        <div className="print-area" id='printArea'>
            <h2>SMILES & Crippen Properties</h2>
            <pre>{printOut}</pre>
        </div>
        <button onClick={onMol}
        disabled={!mol}>Download MOL</button>
        <button onClick={onDescr}
        disabled={!descriptorData}>Download Description</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>KetchKit</h1>
      <h2>Calculate molecular (Crippen LogP & MR) properties from a sketch!</h2>
      <p>First, draw your molecule with Ketcher.<br />
      Then click the calculate button to predict Crippen properties.<br />
      After the properties are predicted download your molecule as a mol file or download a json of predicted properties!<br />
      Make changes to your molecule and recalculate moelcular properties as needed.</p>

      <div className="app-card">
        <KetcherBox onKetcherInit={setKetcher}/>
        <Actions onExtract={handleExtract} onMol={downloadMol} onDescr={downloadDescription} />
      </div>

      <div className='logo-bar'>
        <a href="https://www.rdkitjs.com/#/" target="_blank">
          <img src={rdkitjsLogo} className="logo" alt="RDKit.js logo" />
        </a>
        <a href="https://lifescience.opensource.epam.com/ketcher/index.html#standalone-and-remote-modes" target="_blank">
          <img src={ketcherLogo} className="logo" alt="Ketcher logo" />
        </a>
      </div>
      
      <p className="read-the-docs">
        KetchKit is a molecular sketching and analysis tool built with Ketcher v3.2.0 <br />
        and RDKit.js v2025.3.2-1.0.0, using React and Vite for a fast, interactive frontend. <br />
        Read the <a href='https://docs.rdkitjs.com/index.html'>RDkit</a> and <a href='https://github.com/epam/ketcher#ketcher---'>Ketcher</a> docs for more information.
      </p>
    <footer>
      <p>© 2025 Jason Fell. All rights reserved.</p>
      <p>Check out my other <a href='https://jfell13.github.io/'>projects</a>, 
      and if you're curious take a look at my <a href='https://github.com/jfell13'>code</a>.</p>
    </footer>
    </div>
  )
}

export default App