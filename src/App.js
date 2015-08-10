import React, { Component } from 'react';
import { TabWidget, TabBar, TabOption, TabPanel } from './ActionTabs';

var Xyz = React.createClass({
  displayName: 'Xyz',
  propTypes: {
    active: React.PropTypes.bool,
    children: React.PropTypes.any
  },
  render: function() {
    var style = {};
    if(this.props.active) {
      style.borderRight = '1px solid green';
      style.borderBottom = '1px solid red';
    }
    return <span style={style}>{this.props.children}</span>;
  }
});

export default class App extends Component {
  render() {
    return (
      <TabWidget>
        <TabBar>
          <TabOption className="custom-option" name="abc" action={function() { console.debug('action'); }} />
          <TabOption name="xyz" action={function() { console.debug('action on child click'); }}>
            <span><span className='fi-plus'>&nbsp;</span>Plus</span>
          </TabOption>
          <TabOption name="click-no-panel" />
          <TabOption name='xyzzy' action={function() { console.debug('xyzzy'); }} >
            <Xyz>{'[XyzzY]'}</Xyz>
          </TabOption>
        </TabBar>
        <TabPanel name="abc">
          <div style={{
            minWidth: 400,
            minHeight: 120,
            border: '1px solid black',
            borderRadius: '10px'
          }}>
            {'Hello I\'m Here'}
          </div>
        </TabPanel>
        <TabPanel name="xyz">
          <div>XYZ Content</div>
        </TabPanel>
        <TabPanel name="xyzzy">
          <div>
            <div style={{float: 'left', border: '5px solid #ddcccc', borderRadius: 20, padding: 10, width: 50}}>FLOAT BLOCK</div>
            <p>Lorem ipsum dolor sit amet, vix at atqui eligendi legendos, in eam brute tollit. Nihil vocibus inciderint ea pri, ei ignota accusamus salutatus eum. Has no quot iudico, ei elit deserunt qui. Vel ut nulla quando molestie. Vocent laboramus et sea, et pro graeco eirmod ceteros.</p>
            <p>Cum ea ullum quando antiopam, cu qui stet magna necessitatibus, duo in epicuri recteque petentium. Volutpat intellegat ea nam, mentitum disputationi per ea, purto dicant ut mea. Sea insolens perpetua periculis an, id est omittam pertinacia voluptatum, duo ei rebum putant. Mea te ipsum malorum partiendo, ut velit intellegebat ius, eos ea saepe vituperatoribus. Vel iriure postulant te. Ocurreret appellantur at eum, paulo eruditi iudicabit sed cu, ut qui minim simul appareat.</p>

          </div>
        </TabPanel>
      </TabWidget>
    );
  }
}

App.displayName = 'App';
