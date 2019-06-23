import React, {Component} from 'react';

import AsyncSelect from 'react-select/async';

export default class DropSelect extends Component {

    getPromiseOptions(inputValue) {
        return fetch(`http://localhost:3001/api/${this.props.type}?limit=1000`)
            .then(response=>response.json())
            .then(result=> {

                const options = result.data.map(elem=>{
                    elem.label = elem.name;
                    elem.value = elem.name;
                    return elem;
                });
                return options.filter(item =>{
                     return item.label.toLowerCase().includes(inputValue.toLowerCase());
                      }
                )
            })
            .catch(e => {});
    };

    render() {
        return (
            <AsyncSelect
                defaultInputValue={this.props.defaultInputValue ? this.props.defaultInputValue : ''}
                // defaultValue={{value: 23, label: 'papaad'}}
                isClearable={true}
                placeholder={this.props.placeholder}
                value={this.props.value}
                cacheOptions defaultOptions
                loadOptions={this.getPromiseOptions.bind(this)}
                onChange={this.props.handleChange}
            />
        );
    }
}
