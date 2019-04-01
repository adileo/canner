import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Select} from 'antd';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import GeoSuggest from 'antd-geosuggest';

const operators = [
  {symbol: 'contains', value: 'regex'},
  {symbol: 'is', value: 'eq'},
  {symbol: 'is not', value: 'neq'},
];
const Option = Select.Option;
const InputGroup = Input.Group;
export default class LocationFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    index: PropTypes.number,
    operator: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      operator: 'regex',
    };
    this.onInput = this.onInput.bind(this);
    this.changeOperator = this.changeOperator.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  changeOperator(val) {
    this.setState({
      operator: val,
    }, this.onChange);
  }
  
  onInput = e => {
    const {name, onChange, operator} = this.props;
    const {value} = e.target;
    if (!value) {
      this.setState({
        input: undefined,
      }, this.onChange);
    } else {
      this.setState({
        input: value,
      }, this.onChange);
    }

  }

  onChange(val) {
      console.log(val)
    const {input, operator} = this.state;
    const {name, onChange} = this.props;
    if(val.length >= 1){
        const place = val[0]
        onChange({
            [name]: {
                'near': {...place.location, max: 100000, min: 0}
            }
        });
    }else{
        onChange(undefined)
    }
    
  }

  render() {
    const {operator} = this.state;
    const {label, where, name, index } = this.props;
    return (
        <div style={{width: 380}}>
            <GeoSuggest  style={{width: 380}} onChange={this.onChange}/>
        </div>
    );
  }
}
