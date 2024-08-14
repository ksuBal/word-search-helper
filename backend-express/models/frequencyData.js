class FrequencyData {
	caseSensitiveType;
	lemma;
	lemmaFrequency; //For a lemma, the total number of occurrences of types associated with this lemma in the underlying corpus. This is equivalent to the total frequency of all types associated with this lemma.
	lemmaFrequencyLevel;

	constructor(caseSensitiveType, lemma) {
		this.caseSensitiveType = caseSensitiveType;
		this.lemma = lemma;
		this.lemmaFrequency = null;
		this.lemmaFrequencyLevel = null;
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

	set lemmaFrequencyLevel(level) {
		if (!this.lemmaFrequencyLevel) this.lemmaFrequencyLevel = level;
	}
}

module.exports = FrequencyData;