class Variant:

	def __init__(self, variant, I, Alpha, Beta):
		self.variant = variant
		self.I = I
		self.Iold = 0
		self.Alpha = Alpha
		self.Beta = Beta
		self.Array = []

	def getVariant(self):
		return self.variant

	def getI(self):
		return self.I

	def getIold(self):
		return self.Iold
	
	def getAlpha(self):
		return self.Alpha
	
	def getBeta(self):
		return self.Beta

	def getArray(self):
		return self.Array

	def setI(self, I):
		self.I = I

	def setIold(self, Iold):
		self.Iold = Iold
	
	def setAlpha(self, Alpha):
		self.Alpha = Alpha
	
	def setBeta(self, Beta):
		self.Beta = Beta
	
	def setArray(self, Array):
		self.Array = Array
	
	def addToArray(self, element):
		self.Array.append(element)

	def __str__(self):
		return "Variant: " + str(self.variant) + " I: " + str(self.I) + " Iold: " + str(self.Iold) + " Alpha: " + str(self.Alpha) + " Beta: " + str(self.Beta) + " Array: " + str(self.Array)

