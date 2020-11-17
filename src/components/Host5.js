/** @format */

import React, { Component } from 'react'
import { conectOtherDomain } from 'integration-cross-storage-domain'

class Host5 extends Component {
	componentDidMount() {
		conectOtherDomain()
	}
	render() {
		return <div>hola</div>
	}
}

export default Host5
