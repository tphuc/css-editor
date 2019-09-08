import React from 'react';
import { Col } from './components/Col/Col';
import { Row } from './components/Row/Row';
import EditorPanel from './components/EditorPanel/EditorPanel';
import ThreeView from './components/TreeView/TreeView'
function App() {
  return (
    <div className="Editor" style={{ width: '100%', height: window.innerHeight, position: 'relative' }}>
      <Row>
        <Col id='HierarchyView' resizeBar='right'>
          <ThreeView></ThreeView>
        </Col>
        <Col id='Viewport' resizeBar={false}></Col>
        <Col id='CssToolbar' resizeBar='left'>
            <EditorPanel></EditorPanel>
        </Col>
      </Row>
    </div>
  );
}

export default App;
