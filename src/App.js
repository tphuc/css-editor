import React from 'react';
import { Col } from './components/Col/Col';
import { Row } from './components/Row/Row';
import EditorPanel from './components/EditorPanel/EditorPanel';
import GroupCollapse from './components/Group/GroupCollapse';
import Slider from './components/Slider/Slider'
import ThreeView from './components/TreeView/TreeView'
function App() {
  return (
    <div className="Editor" style={{ width: '100%', height: window.innerHeight, position: 'relative' }}>
      <Row>
        <Col id='HierarchyView' resizeBar='right' style={{backgroundColor:'#000000'}}>
              <EditorPanel>
                {/* <GroupCollapse label='Translate'>
                  <ThreeView></ThreeView>
                </GroupCollapse> */}
              </EditorPanel>
          </Col>
        <Col id='HierarchyView' resizeBar='right'>
            <EditorPanel>
              <GroupCollapse label='Translate' style={{backgroundColor:'#1a1a1a'}}>
                <ThreeView></ThreeView>
              </GroupCollapse>
            </EditorPanel>
        </Col>
        <Col id='Viewport' resizeBar={false} style={{backgroundColor:'#111111'}}></Col>
        <Col id='CssToolbar' resizeBar='left'  style={{backgroundColor:'#1a1a1a'}}>
            <EditorPanel>
              <GroupCollapse label='Translate'>
                        <Slider cssAttr={'Translate X'}></Slider> 
                        <Slider cssAttr={'Translate Y'}></Slider> 
                    </GroupCollapse>
                    <GroupCollapse label='Rotate'>
                        <Slider cssAttr={'Rotate X'}></Slider> 
                        <Slider cssAttr={'Rotate Y'}></Slider> 
                        <Slider cssAttr={'Rotate Z'}></Slider> 
                    </GroupCollapse>
                    <GroupCollapse label='Skew'>
                        <Slider cssAttr={'Skew X'}></Slider> 
                        <Slider cssAttr={'Skew Y'}></Slider> 
                    </GroupCollapse>
            </EditorPanel>
        </Col>
      </Row>
    </div>
  );
}

export default App;
