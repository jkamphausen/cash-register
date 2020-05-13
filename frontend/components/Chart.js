import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Example extends PureComponent {
    render() {
        // console.log(this.props.data);
        return (
            <LineChart
                width={800}
                height={400}
                data={this.props.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="key" domain={['dataMin', 'dataMax']} />
                {/* <YAxis /> */}
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" name="Zugänge" dataKey="ins" lable={'Zugänge'} stroke="#00C488" strokeDasharray="3 3" />
                <Line type="monotone" name="Abgänge" dataKey="outs" lable={'Abgänge'} stroke="#F73A3C" strokeDasharray="3 3" />
                <Line type="monotone" name="Saldo" dataKey="balance" lable={'Saldo'} stroke="#000" strokeWidth={2} activeDot={{ onMouseOver: this.customMouseOver }} />{/* activeDot={{ r: 1 }} stroke="#0074B4"  */}
            </LineChart >
        );
    }

    customMouseOver(e) {
        return (
            <div className="customMouseOver">
                {e.payload.balance}
            </div>
        );
    }
}
