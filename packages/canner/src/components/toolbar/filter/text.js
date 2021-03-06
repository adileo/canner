import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Select} from 'antd';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
const operators = [
  {symbol: 'contains', value: 'regex'},
  {symbol: 'is', value: 'eq'},
  {symbol: 'is not', value: 'neq'},
];
const Option = Select.Option;
const InputGroup = Input.Group;
export default class TextFilter extends Component {
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

  onChange() {
    const {input, operator} = this.state;
    const {name, onChange} = this.props;
    
    onChange(isEmpty(input) ? undefined : {
    [name]: {
        [operator]: input
    }
    });
  }

  render() {
    const {operator} = this.state;
    const {label, where, name, index } = this.props;
    return (
      <InputGroup compact>
        <Select style={{width: 100}}
          value={operator}
          onChange={this.changeOperator}
          data-testid={`number-filter-${index}-select`}
        >
          {
            operators.map((operator) =>
              <Option key={operator.value} value={operator.value}>
                {operator.symbol}
              </Option>)
          }
        </Select>
      <Input
        data-testid={`text-filter-${index}`}
        style={{width: 140}}
        placeholder={label}
        onChange={this.onInput}
        defaultValue={get(where, `${name}.contains`, '')}
      />
      </InputGroup>
    );
  }
}
