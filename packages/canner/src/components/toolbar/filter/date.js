import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Select, DatePicker} from 'antd';
import moment from 'moment';
import isNaN from 'lodash/isNaN';
import isEmpty from 'lodash/isEmpty';
import {injectIntl} from 'react-intl';
const Option = Select.Option;
const InputGroup = Input.Group;
const operators = [
  {symbol: '>', value: 'gt'},
  {symbol: '<', value: 'lt'},
  {symbol: '=', value: 'eq'},
  {symbol: '≥', value: 'gte'},
  {symbol: '≤', value: 'lte'},
];

@injectIntl
export default class DateRangeFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    intl: PropTypes.object,
    index: PropTypes.number
  };

  constructor(props) {
    console.log('CONSTRUCTOR')
    super(props);
    this.state = {
      input: '',
      lowInput: '',
      operator: 'gt',
    };
    this.onInput = this.onInput.bind(this);
    this.changeOperator = this.changeOperator.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  onInput(date, dateString) {
      console.log(date, dateString)
    
      this.setState({
        input: dateString,
      }, this.onChange);
    
  }

  changeOperator(val) {
    this.setState({
      operator: val,
    }, this.onChange);
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
    const {intl, index} = this.props;
    const {operator, input} = this.state;
    const placeholder = intl.formatMessage({
      id: 'query.dateRange.placeholder',
    });
    return (
      <InputGroup compact>
        <Select style={{width: 60}}
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
        {/* <Input
          style={{width: 120}}
          data-testid={`number-filter-${index}-input`}
          placeholder={placeholder}
          value={input}
          onChange={this.onInput}
        /> */}
        <DatePicker
        value={moment(input)}
        placeholder={placeholder}
        onChange={this.onInput}
      />
      </InputGroup>
    );
  }
}
