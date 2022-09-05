import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './Loading.css'

export default function Loading() {
	return (
		<div className="fp-container">
			<div style={{padding: '50px'}}>
				<AiOutlineLoading3Quarters className="fp-loader"/> <br />
				<p>Memuat...</p>
			</div>
		</div>
	);
}
