import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Loading.css'

export function Loading() {
	return (
		<div className="fp-container">
			<div style={{padding: '50px', textAlign: 'center'}}>
				<AiOutlineLoading3Quarters className="fp-loader"/> <br />
				<p>Memuat...</p>
			</div>
		</div>
	);
}