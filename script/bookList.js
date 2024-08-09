fetch('json/book.json') // Replace with the correct path to your JSON file
			.then(response => response.json())
			.then(data => {
				const accordionContainer = document.getElementById('accordionExample');
				let accordionHTML = '';

				data.forEach((item, index) => {
					accordionHTML += `
											<div class="accordion-item">
													<h2 class="accordion-header " id="heading_${index}">
															<button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
																	data-bs-target="#collapse_${index}" aria-expanded="false"
																	aria-controls="collapse_${index}">
																	${item.name}
															</button>
													</h2>
													<div id="collapse_${index}" class="accordion-collapse collapse" aria-labelledby="heading_${index}"
															data-bs-parent="#accordionExample">
															<div class="accordion-body">
																	<iframe src="${item.link}" style="width:100%; height:500px;" frameborder="0">
																			Example format
																	</iframe>
															</div>
													</div>
											</div>
									`;
				});

				accordionContainer.innerHTML = accordionHTML;
			})
			.catch(error => console.error('Error loading JSON data:', error));