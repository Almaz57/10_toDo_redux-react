const loremWords = [
	'lorem',
	'ipsum',
	'dolor',
	'sit',
	'amet',
	'consectetur',
	'adipiscing',
	'elit',
	'sed',
	'do',
	'eiusmod',
	'tempor',
	'incididunt',
	'ut',
	'labore',
	'et',
	'dolore',
	'magna',
	'aliqua',
	'enim',
	'ad',
	'minim',
	'veniam',
	'quis',
	'nostrud',
	'exercitation',
	'ullamco',
	'laboris',
	'nisi',
	'aliquip',
	'ex',
	'ea',
	'commodo',
	'consequat',
	'duis',
	'aute',
];

// Генератор заголовка из N слов
export const generateRandomTitle = (wordCount = 20) => {
	// копируем массив, тасуем и берём первые wordCount элементов
	const shuffled = loremWords
		.map((word) => ({ word, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map((obj) => obj.word);

	return shuffled
		.slice(0, wordCount)
		.join(' ')
		.replace(/^./, (str) => str.toUpperCase());
};
