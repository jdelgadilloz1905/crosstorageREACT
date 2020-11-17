/** @format */

import React, { Component } from 'react'
import { crossDomainStorage } from 'integration-cross-storage-domain'

class Host4 extends Component {
	componentDidMount() {
		var cdstorage = crossDomainStorage({
			origin: 'http://localhost:3000',
			path: '/',
		})

		cdstorage.setItem(
			'variable1_8000',
			'Esto es una variable creada desde la libreria ...'
		)

		cdstorage.setItem(
			'variable2_8000',
			'Esto es una variable creada desde la libreria parte 2...'
		)

		cdstorage.setItem(
			'variable3_8000',
			'Esto es una variable creada desde la libreria parte 3...'
		)

		cdstorage.setItem(
			'variable4_8000',
			'Esto es una variable creada desde la libreria parte 4...'
		)

		cdstorage.setItem(
			'variable5_8000',
			'Esto es una variable creada desde la libreria parte 5...'
		)
	}
	render() {
		return <div>hola</div>
	}
}

export default Host4
