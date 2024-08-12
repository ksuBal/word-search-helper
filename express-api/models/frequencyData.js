class FrequencyData {
	caseSensitiveType;
	lemma;
	lemmaFrequency; //For a lemma, the total number of occurrences of types associated with this lemma in the underlying corpus. This is equivalent to the total frequency of all types associated with this lemma.

	constructor(caseSensitiveType, lemma) {
		this.caseSensitiveType = caseSensitiveType;
		this.lemma = lemma;
		this.lemmaFrequency = null;
	}

	get caseSensitiveType() {
		return this.caseSensitiveType;
	}

	get lemma() {
		return this.lemma;
	}

	set lemmaFrequency(frequency) {
		if (!this.lemmaFrequency) this.lemmaFrequency = frequency;
	}
}

module.exports = FrequencyData;