/**
 * Neko.js - Bundled version
 * Copyright (C) 2025 Louis Abraham
 *
 * Based on Neko98 by David Harvey (1998)
 * Original Neko by Masayuki Koba
 *
 * Licensed under GPL v3 (see LICENSE.md)
 */

(function() {
    "use strict";

    // Embedded sprite data (base64-encoded)
    const NEKO_SPRITES = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACNklEQVR42u1XvU4bQRD+5nS+8h7kKhoQwtpI2GeCQsILoEiIigIKlIIUEVWaFKlCEVEgmlQUCHKgYHN2wOJH0Ft5jMgvcCmsPdZ7++sg0bDSSjc/O/PN7OzsHvAyFCNOWPHsNnULbIZU8okDkhfGCStm//wtTOBkuc15YBIOB32SDUREmDrKlOCmjjJERBUbVgBxwrRRcQNxworp4wy1AKhpYHPZ9HFmjFz0F8pOTKjF6Oonp7heXip4luonp85bKtonF8U4YcX8z6qD3rul8lsnF7dRFVhoSvtYeqmKdSE7cypmUx0EriciCh5n++2bMVrHdxmhXCw6tHIGVBkx8VVHcjjoU2g7Jo8FaKZtfK8asJ2A9+e/lDo6vnELXBVrAbDfWizptc7I2X5rcexbltsG+bTl9Ytz58i+p6/hsr0Ez7thM7eD+NZ0c+4NQK7kD912yf/aWNAWW5ywQgco8AUwHPSJG+O9n98Nokx0/vF3W3s3eAPgRncuO4iIyrlz2VHekFzvSbfg81VHK//0qlX2f67HeU9ShF/6F1a9bZaC622z1FiQoe8V6trjowDYqqdWvcDmfPcmx+5NXgKpEY3NrXpa4QEj5/JaLwBxwoq92xwRjfr73m0OANiYa5Y83vdFemOuCWCkL66d6BSIVR4R4eCuW+Gr6IO7bmXtRDWwOtsAAPy471buBVd6ZabhXwM8XYcPPRw+9LQRc+MrMw1tRrgN3ROd/vcvRvV0n/R59jKeZfwD9U4HDIo/9AMAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByElEQVR42u1XvU7DMBD+XCUd8wAsTF2yM0AVCdSKpH9BSBVMLB2Y6IBYeAQ2FoaKtROIFtH0J6WEIlWFgb17X6EvEIaSKKWt4zgJLJx0kn053305351tAk6SZMX2zmeTEeGxI/A4A4CN+9ai4Ehf0mEBRYL+9eZDi6ozLeuBopFgdSzJip1qGEgSgmlZR5KQBXZkqYbh6kcGAADkpgGRAOL3vznjVTK5aUSbAwCQJIQ6XycLnQOSrNhbT22uSvk8KPrmg8BqyEvpVmel3lgvxFOGe0YHPHrDUiF8Es4mIzIsFSAS4rLf3JFF1gd+llSx213Saefz4GlEQpD9Ouz1mL495nLRVAGtmRybi2DutBx1GwMDcJyf9E0AQF3V3LEfeXXrqkYFQU3CysCEmJgbccYsXBmYqKuaO+bOAW9n4+lyLGuoERAJUMuqqFr9pd7vx1Wrj1pWdc8J7ghcvD7z3lmY1vpWweUbPwAAuNrdp1aBEMU+hiEGAPhbAGLMEWC6D1yPX7iMn6ezvudBoMPo5t1icny2k4nvVuyd337MAZ1uZ8D7Rgh0GnoNS7Jieysk1ofJ2gRN/EIVxN0jwkUg5h7B/GLCP4WgLwe+lmVOvPRDAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSUlEQVR42uVXP2/aQBT/PQt77AfIwsTCThRUdQC3IYDjCIkkQ1Qp6oC6dGLJ96BD1aF7K0gV7NjEbUgkq+3QJZN3voK/QDugI/7H3dnQLD3pxN17P9579/N772xCwfGs+uJPdB8GPhWxU8rjJDp2vkzjghNzLZYXnMJzXh4/OmHr8niK8ngKVUFsMnkUy9a8gyg8BjQiVCYWAGDRN1GZWNCIsOib0Ihik8kqEwuLvgkAKzxvcANQaTkBoHppxfZsnSWrXlqp/xfKgWj0yZNknUwGk48BBXjoGahd2bHnndxnyWpXNh56BlRlCwz8PjJi8ufT60z8D7MrZCVnAMvfhnUtVdNJ3N1hd2WjYBIS9m0Hd4ddqESrKdoz2b7tQBUwQKJGZDgO7E4nJjccJ4VNYhjO7nS4jagkolUlQs918bXdRs911+KiOhE2VwDsGZ7OXHw+aK/kp7O4A55uwwAe2Xt9M1uL4+kK5wDLgzffihn/9OpAeEuWZAxpRPjwsgUAePv9houVxeViAADe3aYNjvSlM55OxIAiE+Vw7qVuv5HewnDuYTj3MNJbKf1w7kkxoIhOf3Hvpfo+6+9Z6+i8uPe47wK5qyDPbbnFMpTTacX8y3VCGZ36zxhQ5HSa8sQMvP95m7l+shwY1PXY/uOvYkFwiQsDnwZ1PVXjLOPDwCfWaLIwg7q+nUaUrO/zvWbMcBj4dL7XzOwVGzEQrXE2z3abmacKA5/OdpsplrYSAHu/P641uJSGgU/HtYbU90DuD1FRS90E/3+PvwhmvrcpFXltAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGUlEQVR42u1XvU7DMBD+XIWMfQAWpi6ZWEBAFQQtFAptJKoKBhbEgBhgQAwsiBkGxAATEwsDqAXRlAKlrYQifsQDZO8r9AXCAA52m+bHKSzwSVbux/adfWf7QiCAqKJalG6ZBkEISKID+y9Ln8SiZnn1dXNS2IG+yOd3oFBCM69xuoFCieObec3q5kRE1AGZELvFijoAIFbUESvqaOY1yISgmdds59iw9WYHSHeZcqXDzGWhXOm2zsxlEVVUq2UahDrTMg3Skx2QCemQDV6XYeayHE93omUahIYkdA64yYZuyp4JKYXZARbx0u3PHsP2JHrW5jGp3yIsiF+jqXKlQ1/NzDnKnVDNzDneB5Kb8UzFfXIvvfAORBXVWri7Qy9wnU673obEyfjSfW+MX8ymPd8KyU+G/ySk9tWvPt7jNyGxxtdrD/htSF73uxeOkzMAgM36g6M8kAMisd9uVAEAh4mUTQcpViLtd7loo06wvB9wXfcnUh2vnN8GAHtPjxwv9BbIIU4gHbs7Pu27VuQcODBqQoZ31KmvJCZip4A+OvJXQLbiUzh6rtk0AJtvB6undJBK2d6Bk5c6AGBjLMlNfPJSx8ZY0nF1tC8dK1KmR6KKap2+1iGT7wnpJFRO48s22pfqWD5wCNisZVewNvo9KaXP3hrcFwBWRhLhnmO2Sg1SFZ2/Nzj98nAicAiED123Oj/sr9o//h4+ABHGuwnPcWXXAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSklEQVR42uVXP2/TQBT/XWR79LdguYklCKhOpU3S2K5TlFaIAUVCDIiBBTHAxNAJJoYydOqeAao2bmKnBYGisLB08tJvkS9wDHCpzzn/uVoWA086+eXdu/d+7499L8D/TqSqAZsynre/iGekNgDC+a3PI1zt9SD4JF3t9XJBkCqR0i8jpW6825N04t1sEFoAbh8HK/LLvg8AUO2ldVQgjLIAFvGMXPZ93jxZddQ8CfDroS/9Vp0XWUwCMXTrbhGilK2dngEA5jvbSp3KGRAG5jvbfGN0lgJwzaf38vpoEc+IcZPuN1MRmiS7laa+JznfCsaS3NB97fzxGIHnwR//MSSeRZTUCzxPvwQ2Zbw/mZSKGgCOXXfJJ88JuegHklcnoWRTxh+HE0lv6LhIy4po6LgrzdhQKQ6iEIMohE0ZtynjgyiERYi0BlGIoePCImTlqVoq55kZeHYeAgCOOg4EX4WOOo7el9CmjL+4iAAAh+0uBK9Lh+1u4YVkZPWASZKvmb7zg1a38CbM7IHX36Y4aHVhESLxZVdZ51IGRORvv0+vI/8LLykrovcPtko7X/aATRl/9+O8crPtr3e0nEslsEj+2l/vFOrchIwyX7Y3rI0Ps4taZsIlAKuhVni11sbHeT3OAcCwKeOffn6VhC/vt0rfdskzuvVfZiBZv+f3ZEM2ZdwiqC8DySnn6d1NZRRWQQayzpUGYDYKBpDE/pM7m9qzf6kMPGpuZBoSGcjTqQSgyLBZZw+UicgipN4mLBxCG//4H6yYjOow/hurzuItnxVcAAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPklEQVR42u1Wv0/bQBT+nmVnzB/iqUsHQE4ojp2QBlV0YerSATHQoepAh4ghYqAD6gATAwsTSxDFOEmTQCEqDF065Q/xyuAO0Tnni+2zE6BLPulJ5/e+e++7nz5gjv8Mytohrxs+a3vDAb2YAFZYb14GvuH7tZmFUNrCr86dWM7f9drUQkhW/PWFkzrZn3e1zCIUGSFHlNqWflyF9shMM5DXDf/N5dVU63qz9jZ2JphAFlfiSLbjQiOaypIGZTtuyKdGkWquO9PRqrkunGrVZ6Nko47Kq4jF11staERwqlXpSJM4LB/Lyefll0fli2+0WyF156urEH08NtotnFUmOVG+OKis+IdOO3CelivwhgPK64afI/mpEjl8rtTHUFNGxoqL/jj72G3jtFyR8ng+f1SVvG74W70OckQ4scbFeb/M0t4XJ1YFOSJs9TqBCBUANAIOzXKo+Kd+J9PO12g6ngqEi7NL4tAs+1+uf0oTHqzYEHkHK3bQFmPifpH+C77+Shaxv2yD5/Df+8tjIWIeFpMK2L3tRsYaRQsAsHvbRaNoIY6XhEbRkgsAgL27UfJ6wQrF9+66qBesIJ4F9YIFbzggNd3GGev8NugF7R2jFPrmsWOUJvh8jO25xL/h99+jzp+XSuDbDMzHg4+zy0zkRF7FcSPfXjQnZuHovj/BZbyj+z62F82giOyBQrL15++G44c+NhfMSP7xw0jU5oL5JI/VSEHMRH/Te/Sb3qOf9TWU+VkuzspzPNPnmOPF8Q9ivgdptB/hjwAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB50lEQVR42u1Wv0/CQBR+rykd+4d0cpZURX4I2GicnFycHFyIgw7GwTjgYBh0dsYFEgoFChqV4OLO4l8BI8s5mDuu9NoeCDExfMlL7l6/++71vdfeAazw19ANk1Bb9j4ivwIAYFRsMCo2LCuIMF0FAEBDBA0xkjzv5mvVejQp+TVktqggeN3QEowGPfzct1gm4rXGrzOhGyaJ1xqe7AYGQIPo7+2ChgAaAiTs+YKgDZ2wG0xLw+BeQJFApu6wuWvlWYAym/NrRXCtvEdLEZE0ZWKW44DlOJGfK/Xza3lzrTzT4zVUkVhMULODZpONq7kcEWWF58jqqtNvcdhqRtaZcp6yOTIa9FB2nYYhTTghobQdtVuT1EtwRet8JYgps3X9cacl9D+ms1I8VZSBReCk25bi+TOAsHTcJ3dYAyPfgGcv7lI2vNvOeOb816POWv/iVgYuXuUCLW5lIn9iKu3Gq7dOqNj1ZhpkeLMCdcMkN+9i0cuNNBsHcaJANYKygLphktteFwAAzs2U56HIT30iUN40h/pFQaBumKTU70Ih/kPix9NNI3M60vWlvj/QQjzlCwJ50YePZzhdT0qdfGHXLqpDxzwC9Rd5MdUNk5SHY1IejtkJSufUF3gfWPRFVFS+eTK8wgr/F9/yS/eB8t2KTAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACVElEQVR42u1XvWvbQBR/T1ge9Ydo6tKSIpQ2tmyJ2g4kEDKUQMhQunTQliFT6dAOpUM7hA4loL2FOrGd2E5ChduMnW7JXxHRrcNlCO+q749TQin04OH3Jb2f7n3cGeD/+ssLyzpqusmzbAHzsTaAtAD0Yk03uf55mPoCtj6oBaRBAe59OUwYf671ecB8DJiPbH0gAMZ9SSZ/qa3QdJMTtS+vBMV3JmyP87dWA5pucuPrkZAXqz3Bk36x2ovwsinIBLAyPErozwZ/gJD9bNCL8FVBZALoHo6kUnnSf1IJhJJlaCpy1B+NREdRTUkBUBGliYKvjce5BZ+/AyhPAACbk7Hg4zuyORkXT0JNN/nW8aRyDXi2A/HnPNsBAIjoPduBgPmo5I1Xz3ZAVaAUebYDnu3AznSSsO1MbwKHdZFJmAfiU8fhz2fHuV+9b9lQ5HOTVhT+1CmNoocC5uO+ZXMAgBfz7CBqQeNlPauUySudB+/bNjQRE0RfV5YqAwgDedvqJnK8e35SulZUBeQBhHMZptePu4Li+jQ53GmNqsED5uPLRx3+6ttU6ML83nInIjcxOV8oeG4bFi2aenvLncgUfOPPIhMxPiHpl7pA+iql6SZ/t5gBAIBrWEB8meUalgAgvQMB89E1LFAR4cP3ObiGBSSnEdlcw5K7lObtxMcfcyE/e9iO2NNs4eO6NgACcXBxGtFtL7USfgcXp7C91Kp1i84FMfz1W1D4HpBnU24TRNa0C5iPTx+06k/CoqLcuL8CKmafC2k2vItUZP1RIdud1MA/u64Bl4cirRSYbOIAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACIklEQVR42u1XvU/CQBR/R4oj/4ULk4smSsAPKGAFDTowGFfjwEJcHJiIg4th0MnBhTg4iFEqRcSP2KCJLk5d/C+6OtTpmnfH9doSwqIveem933u9997d67srwF8n4mcQiycdOrYtk0wkAOx0+qrt4t9bRRh3METkPN5qS1+yNotD2KgB+a4ATzPXuhD/KhVGCoIE3f/ZG913ss+N8EEQP+eJ27tQGQ3W10IFId2C5fbdSIX1XFwT1gadF2MRr0myegeihIRm6jyrd4aS4jFpAFORYe4VNCGOGQCg0Om4Y+qcx3wDEGVXMgzQNc0ze13ToGQYrkyd8xgmxXMFPMqo3DXgMr8K5a7B4CKMl0UkCUBeyFjfzOVh5747UsEKt8C2TNLM5SEaASEDyGUZB64BmqWIeZ3I9lzNC+W9/j3T4BRZAFESXCeyDWKjBN1nSscrWdh/6jEyAMBJOgcAwOj497FMV0G+AhF//OClJ7ThcV6m3TB0DchqQ8ZHS1lmDt8itC2T1BdVmCLgcn1RhcPXB0bGehnj9wJ/BbZlklpKZboY7nxYxnY811Kqq6+lVOYwCnQnbAz6rlxNZKAx6LtPTNVERppMLJ50+KNa8QvAtkxSTWSc07dH5pzAT0zYjlJlIe15bVOCtky8d5WFNJy9s45258XY2C6wsXjSadk/Tsv+cfgxZoyP5b+AbxwXH0+wPbfieSMW3XrGEsAkflL+6W/SL5pk3rnnzlceAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB8ElEQVR42u1WPU/CQBh+rhFGfgfhFyiGD4VCi2ji5ERiGAwDTA4uTISBzcWBOBATJiYS5aOlgAkG9QcQ/waJfwAHctCWa3ulJpjImzxJ34/ePffeve8d4EECocgiEIossAsJhCKL4Gy+CM7mnkgceCHhE7wvxBMBPyG7JeAj/y0D5sOmPwN63/fXGzcz4mby4+cuV+z04oybBOGd/OSl6yq1r+d8JAjP5KlOb6v9HWQzjiSI0+TZXs/TIetk7EkIzqVGDOhkMhs2O/9lvw+7Tik4l9oabVnGldJHW5YNdie/nQh26c+pCvyErEBrP6cqaEmywdeSZNB4GkeRUxXLLAhOvZ6imZaQ15SVbvbr9bymoJmWNvyuCbBWT1EYqmiIEvyEoCFKKAxV2/itCPjIEvVkGqWRutIpgKVPH0tRGqmoJ9OGWNetWM+ctYrb8cDzfSHY9Xyr/eaFeQzWQWQSoI2jFk8x95MX9L9aPGV5SVlmoDrRUJ1oqMTEjX5QiYnMPmC2A0sbHYs7A7QDlqMisyOyOiTLTqUcFQ06F4G7SBIAcD8dLjMgrGHWrez6/+l4ri+jh/cRAKAYToB+64XHXgwnLC8k4vYV9Pgxciy9m6ME81B7fhGZbU+f49X39eGpZTX9ypOMh5Cbt+Be9vJn5Ad0D6TZEw7vvgAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACG0lEQVR42sVXvWrjQBD+RkQq9Qppj62uyIVgECExxpK5Ip2LEAipUjjVvcG9wqVyEQImhcHYXGJi6RK5CcTm6uNe4yCQLrBXhNWt9eeRLHEDC7vfjFazszPf7gJMsYUjbeHIdVgeXlps4cgPv/5IfWKFKTz+8zieJQbXCdMAtke3CcxMmWF7dJuKp8kW1wGLiIXl4aUiYAtHivEdTAJMAsT4Diq0CuPYbhQBzkpt4ciPk2nh/Nri7r8un75Pc8eVO1BkT2tyAP/XAbPGCBCXiD7f3xeefNrp4OX3E1VDREQwiTDtdKJ+WtP1lfFA15/BImDieej6M0w8DxYh0eL6rj9bywMGtwpUJVhEOAl8DF0vwi0iDF0PJ4G/YsepHoPLA4O2i7MHf4X/VT8+PnvwMWi7rPPAKMID+orPHwNctVxYRLhquTh/DFb0XP4gTg4AwEUYJHTfmu2on6fPq4SNTsMv8x/1EJFate65aWDjS01aNFIdUEZ6CW1yHtjCkVnbkLsu/SO93r/ut1J5II6nzVM6B+LMlsV0Rc+NtTurvLeMfy0+zsLXrb7QYQQAl89hQtdrNDNxjgPs3O4vQvQazcS+9xdhAus1mugvwupvxdfLOU73DiPsejmP+ll4ZQ4oHrj5+T758e7hyk91XS1iC0cGr28yeH3LfPFwbEpHQL0DqrAplYQqD452DnJtjnYO6rtFc169lb+M65a/3m3HlcBPFj0AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGElEQVR42u1XvU/CQBR/1wBj/wuXTi46QIoftXxU0KADg3F3YDEuDkzGwY0BJwc3BwYxSqGAgEaDJro4sfhfsDLU6Zq79to7sLjIS176Pnu/e/fuegX474Tm8VJZUW0sj0ev6E8AkIMu3TYc+/d+HoLAoDAGxKTUG4E5o728BwSadfDlO5Pp+yrkfPNCqYCsqPbKvcmN+9zNhd8DsqLaiYfmVICHO9uBQBBrXclgcq03Gs2Z+uUp7w9CchtSZsvTYCmz5bwoitDUjPNZ5AEQkwByLRoEtmE5iLs5g2kXBoBRFyzLAUHaTMPwnalpGFCwLKbPjyKeChCxxbblSSi2Lahlsh4fyyZC3iVAiMuHnTbUMlnKxssVrkBUEkfvjvXLvdYzvttQIrfbUa8DMYTgWs9Q6N06a8ZBFQiiCN2AbJmli8Zwe0BWVBt3u8jsqloaqloaAACqWtqxnwy6lC5cAbw2sqLaeA1Pn7tUEKm7fb/pIc8uwIgv1lNCu4HXFyIVkNxnQAwBnL88OjKPz9Z0Ko/UsT/oiyiR3+pyUocoQlBO6oBlFpM+8qR06+WkPv3nmHXTcVNl2KP048QWVIY950naeQAiQbcWWVHty7c+5S/FNebZTs4ex/EGZx7FbjCluEat6dV7H/xsZB+Ffs2ujyd2fTyx8bmBmbSTcuj/BbzbEgDAzccADlY3he6Cc/0vEB18QQsCAPgBH5Db7b/fFLAAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRklEQVR42u1WMWvbQBT+TkQa/UM8dWghRdhEtmzJjV3qQskUCBlKV28dPHZIh5ChGUKmgOkQCg3UcSzHTlxq0pZk8eQlvyL5A+qg3vlOOtXSWaFLHjyke+/dfe/evXvvgEf6z0SWmZzLF/w43f1sQh7MAR44/7UrtZm9bjAnZI5S3YoK+JOTUwDAtFmHQeZ7mDbrEQDenqdps+4njZLUifLtnV++vfPD/3F2VE85kyMwv/UAAFcv14V/SlRG5bIdKx2B1Q0WHjfWYXV7sLo9jBtzYKrPPAlz+YJfPT1TOrbz+ot0EaBhDmeyoWVbB1ZkYJSa/T5OajWfH2dNbD8bXh/hDDVIIN/w+mysygsdMAjB5sATwm8Qwnhz4OHYrQmypHzs1mIrI3NA1wLeHgZObA89JuN1HcdFx3EjujjuOO4/yzLhk+7daJD47A5sB4vsD2xnYU8QboGesizF2X8qO4kbkuAAX9eTkMx+t1RFmhovRiDFHX///Twi21lLBw4AmnjtCHbWqkIGy8aUw9muVIjuZxMyv3bz+y+GOvi2ixV8+DGULtQuVqDSXjU+WfS/u9AJYcyPP05Ggq5drAh2Sz3JcvmCv3c1SjyxZdqg9i3ThurjQgsvqhPCvjJumTZapo39nxdsrPyyCbdjmguHvy6Y7O3zsjAhrFsGXNqOj35fYmu1BJmcp63V0tLgwhHQ3esa8Pn6klUylqBcfc8KPBKBLzdjAMCbZ1YEwCCZ4Kn3Aqp79dTKbPexSRgG4KtlluCPBAB/AICO/mbXcGCoAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACVUlEQVR42u1XO2/TUBT+jhV7zA/xxIJEFTktie04JRUKSyckxFB1YagYwhB1qDq0Q8TAgjowtFOWIGgaJyQBWgt1YGHy76g8toMZwnXvjR+xXR5CypGOdPzdc8/5zn0bWMo/FvodQYqq5jPbcx36awRYYrV3GmDuk41MROguie+978f6/Gg2UhGhPMnvf+in9v/+uJFIopA1eenj2Z9ZhGxY49gWVc1/eJov+ZeNR7FxJf7D7A+EFT0vMlEuTYorEFAkoDGYOfMdiqrmNwYDKBJyK4sbS8BzHeqvr0MmQtO20bRtgUhcdaxPkvJx50mEFqHCzdTm0A7srlUXvuOweeladSHu5tBG16r7bE1IYQIUqU9HwxCW5M/7eK5DXasuxGIjIfHz/Hw8hCwhlZ7ULKTx56f4pGaFcIkl356MoBDhnWEtrCpt9QoRticjYYuz+AyXbrfYTHk7SdP6yQS8mIok3uq1IEaBn/sou1MxA/vl50+C3amYAhYnnYopHESe69Cbas0HgEKwzX6Nxauvs4AHa7eJGRZ5OEnJyQ/WzMhTkGEFANg9H4c6RmG87K0a2D0fY2/VSOWfeBcUVc3fv8geoF02sH8xRrtsCDiLxfCFt6HnOtQuG/6hMwk5tDQdABDVduhM0NJ0oa2l6ZCJ8r2Ios5qz3WIx19/CxPZKemYb98p6YKd9akWeR0fX1377H44vroOKY/zfkk3LGUlcXQ5BQBsrVQjfY4up9haqQYVL3pn5BqJnnfj97ybUGWs6qSK7/QkY5U8e1DxF/ks/3iW8t/IT40PJnKKo+HTAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBElEQVR42u1WPU8bQRB9e8q53B+yFQ0N1kIgtgPGArlylYaKIg1KAQWiiFIkheWGIhU1FRb4zB3YIMAyTZpU/h+4pFmK02721nsfxnYo8Egrzc7NvHk3O/sBzOWNhdiMlHExHPTIrJJSxoXUnSxO007OzlpgZ61kAgtNb+okKONioekhRwhyhCQTcB1g8Xx6JCjjYvHcg+uE2H+rFQwHPRJLQLLMX7QnJkEZF/mLtsL8sx0mt1ZAJsuRf2O1FZJ4DRHKuFhttRVWf2sTeoMT07nkXSYCXlfKyLJDJFkdzxb7QQ+oXIbOXrkMqY+zTfUKJcVbCQCAS4hV16Xq+2hubFgTV31/7P5woo0XDrMHzFELfJWUMi5qgY9a4CfGmHGRClDGxZerQBl1PW2ds/qmLoFr7IeT4npkvtMJEucTE8gZa77bvfovl5EDAMNBj/wufIZLMPOReBuaDfLt9nomf11fK6nzILINzb1dXytFCB3cJRP6+bGU6pPpPaBX5Oi+Mxbg95UiACAtTvqRtKP0x0PnVWU+XC4qPQ7jcLkYXQIz+a9eN2Lf5wXY7OZ3KdIvzm6tAGVcNPqjCfbyBTT6XezlC7F/bfaQ2dQSV8caCTh+vImAfl36BAA4frxRui1Z1pNT4utY6uPp07Ma8v7X59N6GelYsSWTfyhts3wlz2Uu71teAFFh4qYSYLUBAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACGElEQVR42u1XsU4bQRB9Y/lc+gPSpKJxlYYoxDoS2WcTO3YkhygUNChFlILGonATpUgFRZSGAlHRUATFoBjHBoOJ0AmIUqW6JlUaPuB+AAp77Fv7lrs9L1SMNNLM3uzOm723s3eECSWZMq/Ydh2bVOfHwy4ukwc7DQDA5dtXkQqI35T84feGMPb/jZhk9Lk2AFw5J5yq7+PffBlT9X0AEGwtADih69jEdmp3mMB5XRZ8ADAI+gAweTj5o73mIOBvpST4LAnSgyDmdRiIERvq9I+m4Bv9GX5j2jgQVF268RO6RAJAbZFf5ZeRewLJTkG+2QqVvFMqwi+2UyoiDBgpgFKrpW2bm8WiFAQFdcFKu60FxF6h4AuCwvT6hQM9IL69GAcRDzNR15kP7AMyGT3zUfXd0cHYBRcLuwO69MPxoQAiFIANaw4GQdANa853PIwqcYAvKC8PvmTyWDnp3F4nlPEAAFaf5wX/Tkjo5cGn06OJeMEFKAFwHZs+P8shQcN7gm1VjbwDvY8QgtHnwsfZ3MBX0TX7OBoA17GpZlqomRa+nvUWqZkWEjH4Ksd6fba9rV5pB7iNVtMW1s+7YNuvUgBYP++imrZQTVtCLM9VBiD7Zlh+mvV91wkCNi+6AniO3bzoIpkyr+JRAbyfyWLr98nY+NKTjBAT1FMoyp/Q9h8x8eLjjO+rCrrqXccmmuRXTCXpvdyLTK4Barewz4vWnFQAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACaklEQVR42uVWMW/UMBR+ji4Z8y+6ZGKpBEWhanO55K4+VQdCTCchBsTQjQEGxNCNATGU4cTQjeGGFtGkTnK9tqAIkOjSKQv/IlK3SmZAySUXJ45zyoSlp7zYn+3Pz5+fDfC/F8QDqJpOq9rjKEStEVA1na4dObm6P4+GAACwduSk/iokUNXk2rED0cNhWqcdO0xsFiMaGVQV9jtf3NKO1yMMZZjrEa5NoMOaOI5CpGo6laU8+GoXp/76VxeudjGwMCJb0qkKm4KK49w/OQUeRqR0WEpPiChLY285p4UBspjL4Y6wINMA9lwCPZfktuJyuAMyQqUGAIV/0ZISmOEBKBIAJgQwIYsVSuWGCUn9GR4AJoSbN5gEkrC5g0G6mpHnQVKXredFY+R5QiQQ6xQ88T2hME7tfqHP1O6nC8sSWtaIxBLf1O6DghDTkrbsdxz4Bdw48EHVdKpqOh0HPowDXzwTPjvzV75sDk0bknEOTbsQAVTnInoxDxpNPulaad9J12IeUYl308VRiCZdC2QEwvZPmAufJU6pzkriKEQHhlWqC5YdGBa8vJjl/Mo8UIfE++0eyBLUstffZqkPsKhLhFn7QcLSxdvvZyuLc3/ThDgKkdSks4KqbX/T5GKEtyBbeFnxXTiHNw9MbuZsTKDqfkjsw485vNK7pe2NNZDo4OPPcy5ub8PI/S/32dsw8g8SUR3UPT2ZCemnX+fNjuHyoM/vGdxcwOtXeJKJknh6d7uQ2T7/vuCLWIL2iqrpNLi5pcHNLS17FyQYVdNppw0SMuJH7/H6Fl1pC6oFimqLs50ItLnHdXVQ9134F98Q8gr7ARJFAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB/UlEQVR42mNgIALwadn+x0ajy8PY6PL4AAsDFQGflu1/qVWbIJwwv/+frh1mpMgB+HyCS46ViTRHM5ISBchAde1mFP7tYF+segmFAtFRoLVuM8O1IF8GrXWbccozMDCgqLkW5EvQXKID7FqQL4PB+i0MbIyMDNeCfBnYGBlRMEzMYP0WOJsqiRAW/KYbtxCMa5iY6cYtDKf9faibC9B9hM2HxPqapETIp2X733HzVrKy5X5fb4KJkJGcbOi2ZRtW9bt8vEjOCUQ5wGfbNrJCYIuXF2UhgB4Kgdu3MzAwMDCs9/SEs3HxiSkDiHZA+I7tDCs9POFi4Tu2Y6hDl1/p4Uk9BzAwMDDE7txBUvAvdvcgKhTIKoqTdmN3zDxXD5KKYZIckLFnJ0khMMPFnXpRkLt3J1m5YLKzO+XlQPG+XRS1EXqd3PA6gmBRTGr9TipgIbUOoLkDYCkeFmxsjNRrrmHLGYzoijoP72Eot3VB0dx5eA9ZliKbAzOj3NYFxREYIcDGxMDQfxRhYaG1C0O5rQuKGDGg0BpiOSF9jNiCasqxvTSJ7xwrZ/xRgK3km3Uc4Zg0S2cUdTA5XOLoctiyIwuh+jvN0vk/NnE+Ldv/yDmEGD1U7YBs/vIbjknpCVHF8p1f/8AxpZaT1TVjhQZqgIkjbYKYmFCga7APawAAsE7pbyBJsScAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACBUlEQVR42u1XP0/CQBR/R6AjH8DdpRMLA5IOSOWf1ESIMrk4EAcdiAOfgcE46GAcXJwwkUZbKUXQgairUxe+BdFJkzqQFloO+voHXXzJpX3v3t375Xf33t0BICTKcnqU5fRp3d5P+2IkjAm+cnM/Vna39JE2IBCghDFOkRAdmBNwAAAnwCgADCEwLAuWiVdvJYvPsCzobgK7Y4AAsC0JtJIAbEui+hh2rSS4WoIQlgGtJEBMlM1/hhBLM2wxUYaYKKM3IoqB9+0ixO9kx30RCS1pExosLNLn2ZyEYNIwJT14SrFnYdNxMxJMKtklI7ep/t1igWpfBMIRQLHd9lxk5ELBHwN2FrYVBQAAxHze/J+nY2sBCkClo0AzlzdtlY4y42fvb+bywQEAANhTO67ov87mUCwQ7Gk4re8/0sFcbeTQm881gIOe6oqBCz4b3BIc9VVPWXCWzvqvA8dPXV/n/cl6ZiGIsJe7wK9eSLzUd18A7BcKJqD48y4qxO7UGPSgzvGWwY1Bz1PQ6XmMOeocbwExwwATAjh9mQSsJXmoc7zFhpFachzcaRyhUXX+2l/Keh+upRcvAa3yXb5NwFQTaYuf0TfPbu+jpWPY6fyuJtI6zR5lOX06QzBjApUoy+nSx5fZ3LyGAgWhfn6bzQsIX3VupA3ITjwFETJ+O/yZ2B+v/+JGfgB+jOuPbXDY5AAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB5ElEQVR42u2Vu07DMBSGj1Gb0Q/AwsTiiYWhIEugBNJUQVVZmFgYKgY6IAZ4AAaYGGCoGBASEwioaEvTuxAVF6kLUx+EFzBDScitidM6YumRLNU+f/OdOD6/AWIOTCjDhLJR+Zm44bN35UBNIk743H05VJeICz7/UAnVAAAg0WAAAPLohQ82NwAA4HvQQ/YzgUTCF0rVUN1XTnfMkSj44lOVW9/P6uK7QEIocPSzuvU7ljaUUPCwawAAVivPYrsgiRCXpqlnHHphBUgce9nUM6DXapP5gJ+t5gwDSpoGOcPw6EuaZmn8AkUFb9UNITt2m9b4C8CEsu1GXQj4Rk07DAnxwHdao+FXa8MHBmnsOhPO9QkwoWy33eB6s6KiwihtUVF94YE+gAllhU4Dkgi4RqHTgKKi+uZMsBseakRh7uYeB90mnMuqZz3ydYwJZUcvzfFN6fe1TlbWfbc9sACz3SQ0/j1lgsPgngIwoez4tSWk3cLAni7AhLLTXnsi6CFVIsGtAjCh7OztD76/PHyQfc0dbo05jwIHAECYUHbx3rEW9pZkh1PZc+4wtZN8BuS+YNx/sucuP7zF5FOyYz2fki1tPiXzHcIgkT2XT8ns+rPryLvndg+JdAjHvYpFdMI0pvGv8QP2TLS+2QcqhgAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDklEQVR42u1VPU8jMRB9RkvK/QE0VDSuaChyyBCxSZaglVCqq2goIgquOFFAgSgQRSgQBRSIAiHRobuLLoTNF0TcRXxINFT5IfkDpggb2cnuxk42omEkF+N59nsee8bAmM2kjJuU8aD4xLjJp66LoRhjnOTTv4oDcca4yGd+3yhhjaiJAYD+uVHGkyjJZwulwPhb1gEAtFtNErkAkzI+97ekhH1ddboiTMp4ZFUQIyR0vK46iBGC+eItxLI0ohMwHCayDEwSEjpETLrkdrMQXQZ8jlJaWQEAOK4Lx3V915FhS020bLmMQiaDbLnsu6aQyXRxnt9uNYlJGTd0ib9X/EmC5gfFDFXytWpF+1qu7GXJX6tWcGUvS72AqJCv14PJL1IdkjCMiNNqRCZlfOOuqnTas6QNFexZ0pYfoXe3ojKP/Md9VSvlJ5YNnTUnlt15A1uNGo6W0rxXRIzoFcnHPthq1KT5o6W0L77dahIDACYngJ2HGvKJjgiTMr7zUBu+KX30hHyin9jb14sZ4kn3/tWxv5jiw5xeNJG4N6v5RFq68u6vdPC/HklH3F1I+RIHmVQSh827kci3WVKLvK8P9LbZ48dgQT/nkxLG83XIBzYikzJ++nQfGN/8ZoVuriKG6Hw+58/9YnJxS5r3/FzcUhIx8C8QN8jFLX750pDivb5uBZFRv+JRr+DLvuzT7R3IiM4X8PjWmAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACMklEQVR42u2WMW/TQBTH/2clHv0BujCx3MRSiVIdquLEjqNIVSamSqhDxQAD6kAGxMRQhoihDKhDhdQJBERtTZ04TRSwoEhdmPxB/AWOITrHjh3H18Sw9Ekn+Z3f3fu9u3fvDpgjGmVco4yjYFGyfq59OkPREJkAZQW487lYiEwAlRCohODul/PCIJSsictk2ujX80LyopSWfABwr2snjEXfn1aTB75HVg6gUcbXT+2Fg9ZPbVxvrwZCiTrfPPsGlRBcbzfD/Z/XCtkClaR/FyklEb1hX8wkIPl3AACgRg5k82ICYzcaMb0wgMD3iN1o8JbjAAC6lgUAEPqsdC0LLcdB17ISR1I2MYlGGQ98j2iU8Uc9Z+mIPtYtKZAQQOTCTr+HE7MeM9rp96RBTsx6LogYQLQQ7Q6ynR7XJpBZdse1xRBktrQ+uewvjO591cxlJ2yzIIhGGX827Ode2kPdhIy9GDMLIQIvBb5HDnUz9YLZH7kxvVMxEn03EY0yvj9y0akY01LcHrtoj5MOOxUDZWXyNhBvBNnWHrthxBplvD12w/nCOnCwZfC046NRxg+2jNgbYZnIX30fxHNAZjAAvP4xWEkFfPmwhsD35MIREG+8y6Wcv2DVcKXJTZYRAN7+nEA836wiqqeJsEkr10TG6Tx592s499/TB3p2Hcjj/OhqiL0NHQBwdDV1trehx/Rof97LqZRnBaKZH/3+8HuUsH18vyJ1I65kC5a9km/lVv6r/AVuRN3MU6s4+wAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACFElEQVR42u1WPU/CQBh+rqGM/AAXJ5dOLiQqwSiUjyLG4OJkYhyIgw7ExcHRQQfC4mAcjImTRiUIWoGixgY1cXHih/AHcNDWK1yvVFsmn+RN3uu9d3n63vsF2CAkRXshKdqDzxB4m2MXN/CbBJeAKADjl/6SEHiuDhKCICGYuKr6RoLQF3c7urmWrqsDxp3lRdPOFwIAMFmuOR76yGU9I2GJgXClBlGAo4QrNc+eRGC9+ftS1tTtxNMsmK/efhP4Elq3E08JiN9/9Li4YOoiIVzxCgEACApA9u4OAFDLZGB8GwUCtAcAIKeqAICyoljWNMqKgpyqoqwoA4HoNjvMNFy5Vz35o/O04ooICUnRHl2AVuv3nhA5S6WHIkH6O6Chrzf5RE4SaUe7k4QzCcJqw4a+odWZh47klO0ey5ZHQmAFkXFAJINyJKew1aoz91iy1apzq2aAx76/4hVjSWw/NEYzD3Q7OinGkijGkmYPMGYEt7Lz1LD1AtcDRnbszyVtveIGRsZxg5B3GAD2npt/cvnubMISlK4K7oGuYXc24dgneHKga5bnIG5dWGprKERklNoaAKAQkQHAXLPAsilEZHQ7+nAP6jR8HL60bPc2Z+KWUY+23ZyJO3sgJEV7x68t5KfjAIDj158L8tNxy5r+btec+mfQwDAeoCOf1k/fHgZs16Zi3Mr3qyxwO/95OTX/4x++4xOSOse03rTZxQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB6ElEQVR42t1WzU7CQBCeaShH3sILCTdNEEIMAkIrGjkYTySGg/GAB+Ib+Ap6MByIVw6GRP4KWDw0ikdPjW+B6QvUU8t26c+2tCFhkkm7M9t+X2dnvy7ArlgimdMTyZy+NfCUutRT6tI3iVgY4Huv/e2VPf37Z3qQJdi4AnFEAAD4qVVBUxWMnAD9lTxnn2Mlg37Bs29Dprmf56dMJNAPeL4/9FWtjzNvEsgKfjIYBeqRaVV0JYEs4NXRaKNGHYjOJDgv8Np4DDyi6QNRtIxpt8u7Gee9zVbeEwS4ksbQEwRL3CsfiICxpeKIphvj+kSCbkWw5LoVAeoTyTKPfM5JpGJOwI2ZBAAAnVIFGjPJvDppADkm55PPdUoVndYIpMFv3ye2FXkuloHOGTG3nNO7DBLopnKk3cnrL3sslJnztBkEYnZBu2WJ23Tz/XzquQW9hIj5X8BzEInF/P71wjaOncDKH45KtjpAx0OtAK1oTgrH+6wU+xJw7mM63soWw1sCTVWwlS2a2v70JZv3TvHQewAAoJkprK17eyGvxZqZArQXcvhHMk1V8OawYIrVy/fczF2nj8EuHsmhVFMVTCRzOglKxv1oxkanYlLlSBmPR9UDrHZ5kAcet0hAUxW82M8znYq5IOXeKfsHQujGWwf3KZQAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB7klEQVR42tVXvU7CUBQ+p6EdeQuXJmwMBtIYBIQiGIODE4lhcsDBOLj7CjoYBsLKoCTyYwGLQ6PwBF18CJK+QF1svW0pvb0tIZzkprfn9Pb7ck7Od+8F2FdLipKZFCVzZ+ApfWWm9FVkEhgWGADg4GXg8P9c1MDQNdw6AZKI+OokodfZSHAsBAxdQ71eAwHRHqyWYCmBZTznH6fNBoYBz76NqMl+nZ1SkUBa8NxgFDq9n7VgEkgDfjIcM9d4Wq1sJIFB4NXxOLJuDCv+JAK7gEd0jGGl4vEFxSO1oYD/oy/LcKm8Q1+WHf6gOBMBq6XcvS4gQmOiQK8sO2K9sgyNieL4jlznJ9kJP+DmTAEAgE6xDM2ZYj836YD1Tn5PrusUy6ZbI9ANfv0xWZuR50IJ3DHLtynm9y+LBG5SOtJuVO/PHvMl6vg6OfeUwK9VkqJkrtP7u/mUat+IZS/gOdiKUROIsuPFsh2Tff1wVFyrA25/rBlwK5qfwvEhM0WdgXupAAIHIPytsObkcPtjPxFZ2v70rdrz22zB109zHqAm0F6o0MrkPXVvL1SPr5XJb6cLuss5XB0e277ucm7PSb+ha0h7XGfSAQuABA0LHIsOkDVmvaCEaEOA83RuN0Jk6Bqep3PMt5/YLya0pPfimv0Lq2rDFPLlvv4AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACLklEQVR42u2Xv0/bQBTHv89KPPJfsGTqEkRAEY0dAjGGqgNiQEioQ8QAEwOdOiAGGBADDIgBsTCgqqA2Ib8JLVHaCvb8IfkHzBDd4Zzts51YiIEnnXT3vXd3n5zv3bsA7xbSxhJpayyRtqKaTxlm0PiPYmQgQwHECUhcF5G47oO8OoBKxMuHm9JIEDGv78zqvW6bHDsgYCd/lvD0ybS8/GVGXgDTv24BAJ2lBdhhGBzrF62ztBAKwhMgU3QucL/Yh3HrE/2CQpAs3HKlsu8EddOAm1/dNAJBSA+hqvgXs1xG3TQceiRRECcKVD5XKrxeMgzEiaIBUGmw3OTzDk3sX6lWoFIEO9DrtulqPj8Q82u1KkTN3l6rVXl9pCiwH8QvjWqgic5n5x0/YGQABrHRrAEATrNzXGca08V2ZAAMYuuuJvU51udg9znWg0FQmDQsatutOq8fajnXczRULvA6lCKQmBO+/n4B2v+YGz4ZBdmNb38avL07M8uzZCTZ0G/xvYfGgCa2R86GssUP2k2pz046GyoMlbBvQK+csJPOQlWAo04z1Psx5rf4yd87AMDmlG6x/GC3zSkdAMD8vMZ67Yg0HZ/9G5y0kOovZtcLKR2in5sVUrrrZ4n5vf3sdvG/hfVJzaEHPf1uTz0pwPqkBgC4fGxJ34RxBVid0Bx+QF9nZu9fndCsXrdNJCP9/nTv6FtOZri+nMxw3c1XHOd2sVHQa1d2Q4b1f/9/+absGb5W3m+1qIDWAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRUlEQVR42u1WP2/TQBT/3SnOmA+SiaUIWiWoDk4cE4EYmBASyoAYyoC6MEQMiKVDJjp1qCpVDBVDBXXdJI7NH4u2ors/iL+AWThztu/O14Qy5aSnu3vv3d3vvXvv7gGrtmoardFspY1mK72Jvamu4q1j90aA1HQVDQqsfXYBAFePBikAJHFE/huAOvl71saXUwDAz4cP0mVBUH0AZdo8OV36Wmp8oPGComUGERvadT0AwGzgpEkcEbaPrmdyVzDwvGzsOk4OUL3CVwPPy9awsQ6IGm+x6zjp47MzAADrF2kyb2nFgOiui3Tc7wv5/B4LAUjiiBzZfdQJkdKR3cez6UQoK2aMTnCWPJDEETns2TAoSnTYszH0J0KZQfNvxtCfYOhPKkFQVd6LLGTjfcvGvmVLPcDo5XyqBEFkbz8/fxVMc/IPnV6Jx/gifSYTZYUUwHY4u1bkj80utsMZxmYXACBaPza7JRBUtSEjgyLrVfdvUODNt1k2lsVIpQf4a3j73S/J3t2zIJIxvmpd0QNEpxYo8t7/8KX6o7YllY/alv4V8GnJCAB2ojkMQqS0E80xaltC2ULfcfFzqWv+n7p6tOrw3fMAu+dBBqRo1euN+0JLRXrXAtBottK9iyB75/cuAgDA1nqn9P7z8631jvBPkX3RtKoK4ungMizxRfODyzDHe3G3I60PlDHw/I4JAPj4KyzVhzrzp7dNZTYlcURqqsD7dPVVWR8+WdvMDuJ1+YNle/xZnxLd3Fel6aI14b+oqldt6fYbJ4vcX+ijmoUAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACB0lEQVR42u1WOU8CQRT+hixb8kPoNQazyLliYmNhLGyMlYUWxgIKY2EssDAWUhgLY2NhrDwADxaPjUK0J/FnyB9YC5112DlcdiE2fMkk+45579s3xxtghBECIBY3nH9Nnvz4dAZFIhLkD6MRYOzieiCViIiST15WlcF1QqATgr/8AldAJ0D6ig8eixtO+qoKncAdIr/QBKKEIEoIzOsaF5za2CHyC1eByO+YrX0Hj8UNZ7ZW67GJ/PoloMkqwGKuXh/aqSKyU7BwEyzpWWEG3Y5NQi0Bu9NV46www+kGsgT0rMtwnC8AAJbvb0IvgaaqgAiHuWmsNG6ltn7Kr9wDrLxmiRMeZKd77FQWQUZMWoGN5p002F7GVPqI9HsZ0xGR8FWB0uMdyikTpcffwOWUKUzO+nhRTplcJchfLXfr6Z6zbU/l3W+RXYbtqbx/AqrOuPP8nXQzme+RqY6VWWwmAxDwktm1G5y+aOTc7127gaKRg8zPS0DzWwE6URfcD/svDWE/CXUT0uSVVwuVV8sl4u2E65M5Tifrmn0RiMUN56hluX3/qGUBAFYT2Z73AH0/0LGayHI6qhcdQ2UFvPf8SbvJ6UXySbvpu0co98DSRAYAcPrWVPYJmbw4nlGeqG7HJppq452/Pyj7xPxY2k3E+rKJZTF+5jsk7Lu/27FJ0OdYv41rhKHgC75zwvPm1FJtAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB7UlEQVR42u1XvUvDQBR/dzQZ84dk6hIpLVHSL4u4dhJBnBzqIA4u4iAuDk52kA6li5NDaZuK/UhEA23RvfhnSP+BOJSk+brkLski9MFB3nt37/3evZd7dwBb+m8kiLKZRJ/Yee7n1yQ5idIHEWYFwSME2a7qi1QQZTPbVYFHiMkeZole6qnAYQCOsMrSST2VOhWYNXprFPpD24kgymahP3TpU90BQZRNZTAEHoFrOIvOq1MGQ6pdyNAi5QKiqqqviQubOgU83ozx4YGLJ8lpKPYOcIQ8c4x/QYa+AMP5KHkKADaWj0dvgXNI8nRSgAHalZrNn07WztqVmuvbq48ixHIQnU1H1JE9lfdhtTRQagAsEOdaNIjHEp1zZgDebnepj235Q7Fqf9M6Z6oBr3FBlE1vT2BxHHsHLOc3HxOf/HavwgwiVgruPidE/fUuGwjmIrw3ppHzruQyNYgMbdFZBnnMXrBhYHCUgeZMg+ZMs41xCLnGRaHsk5HWMgEQRNlszTW7v7fmGgAANPIl353AyTfyJQBYz3euJYHAtDcgHiHoLHSfPIjvLHTf2lg1cJIrAgDA85fu6wu0/NFOkXhlXy0NlAkrnpfv99DOWJcU24lzrjNiS16XFJ+9uqSYKOnjYrU0UNzHSJyTc0up0x9N3LOrkIg/XAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVR42u1XPWvcQBB9s5xE0uiHqDBuFIwPJejOd76Ia4w5UgRDfoBTBBvShBQhTYpUceXCGEKKkMLY1kn+iM4kAtvE/eGfYa5xOqUIq+i0lrQrXRPwwCJm3u7M7OzTaAXcy/8mhmnHdfDawReub+K8IGX4XcJUk9CJML/nCTs1TDue3/OgEyn5Yyq7t/Y9aAzQclZxzNr3pI+Cqe6ej+bBMAlimHbcPBhO4TOtgGHasXM4hE6YGmnSZTHncChVhYZsphoRTvpuonc9H13Pn5qTxWVEOgGdAX3/n1PPddH3feGpKkylAhoRPNeFRoSVIIDnugm2EgRTuCbJA1JtPs+OAgDA195T/LYeAgAeXN0mdo5xmYwjmskRrB0flb4h2bmfl3uz44DG6uG1ODAZR7TT6Qnv+dzmKuY2V4UeoRNhp9MrLb80B9JceBkeJ/qn9jIAIG3jdpngyglkCbkxOknsH1tdaeJV4kDWuWHacfbcVQJXrgAP/vbHqWB/96SjnESlI3j/8zQXf/NYLQllEn6IvpfOe20vSSfRkCUdd6gzdcIWJcPKHGydh9g6DxNnvM/z8aq5JNjy1iolYJh2vH0RJt/37YsQALC+2BbuBGl9fbEN4O/89Nq8JJjsDUgnwu7lSLDfpe9ejoS1lTjwYqEFAPjya1TY94v0549auVf2yTiiRhF5vl2dFX75BpaTBEnPTe+Y2weWI/gbWE5MdX8uJuOIqv6MVOmc9zJz+QP8XtOXkLwbWwAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABmElEQVR42u1WP0+DQBT/vYsw8kGYbVLTkKbYOrt0bxyMiXFoOsjk0M3BdOnk5OLk4mgppRjSatSZL9BvQOKMA7kLBLhSSeMgv+TleH94794f7gBq1KhRo0aNPUPTjehPg19uviPZJti+MtR0Izqbv0DZEoFVDX7hzDKb4HKVCCqR1MdBleBXi1lhJRTK2oeBT5UqoOlGxGnk2iLDkWsDQGrlOl6BkWvntovtEtjybFheHERhabI8G3fmiVRnedlNUJngN69zwY/bPST5XTBu9wAAyVaUmgGV5HwVsG3Z3/oOFCJB8YDRryhvYJks+GTlQGVIEYCMrAxdG10AwGTllK9AXhbT9QLDVhcKEYatrnguIm4zXS+Ez9LngKzXKgH3b7HT86NjIecyLk/ySZ/8XCBZCx7e3cINDJom8vTb5Mk1DHySt4AV0+NH7CRPrjAI3aBpYtA0hT33W+oc0HQjevpcSj+jfqMj1fP3uV2SDwOfpDMQBj71G53c2+75a5laOU4POyi6E7ht0ob28ZPBTzqZXd7F9D/xA/QaqUNb1YQFAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABj0lEQVR42u1VPU/DMBB9ZzUZ+0M6U6lFqvoRWlaWjkidqg4wZYCJoVO3DjAxdWFiYSQhTUFVoQLm/pD+gTIgBydxbNPSiTzp5Pjdne9in31Ajhw5cuTIsUcUS7VNsVTbqGzYPoOfeo9aO7ZrEBVvGazOdg2elcQg8GATYRB4UB1DYZc/Pp96uHaOpQEsSvuuV3Paagd4MbmhDzf0AQBu6MMmis2TOi6ckyVKJsEvn/0YN2p0IOMApPikz6jRgbgTpAt+9fIU44b1NpKcKYb1NgDEEtDWgE1m3LbQ1oBFFBMZZyqyYmaq7R8vAtgMMQGQ4nRyUTuKfMeLwPwaillz3LxOcXboRKPIy8Bts9Ys/Pb8Rd3t28/C/ep3MklOnItr8neBqRMgqUyWIfpVJ8Ul+ckyjL77VSfST5ahWRFaLFvu3kP0Ki0pbzFEul6lhV6lFdkne4T2Hbj/mClvSbfcVOq5P7cT5+vVnJQ1sF7NqVtuShvJw+csNnKcHDQzewK3FW3oL9uwmLjOTtaY/ie+AHsGpyRz/nH/AAAAAElFTkSuQmCC"
    ];


  // Animation states (matching original Neko.h enum)
  const NekoState = {
    STOP: 0,
    WASH: 1,
    SCRATCH: 2,
    YAWN: 3,
    SLEEP: 4,
    AWAKE: 5,
    U_MOVE: 6, // Up
    D_MOVE: 7, // Down
    L_MOVE: 8, // Left
    R_MOVE: 9, // Right
    UL_MOVE: 10, // Up-Left
    UR_MOVE: 11, // Up-Right
    DL_MOVE: 12, // Down-Left
    DR_MOVE: 13, // Down-Right
    U_CLAW: 14, // Clawing upward (at top boundary)
    D_CLAW: 15, // Clawing downward (at bottom boundary)
    L_CLAW: 16, // Clawing left (at left boundary)
    R_CLAW: 17, // Clawing right (at right boundary)
  };

  // Behavior modes (matching original Action enum)
  const BehaviorMode = {
    CHASE_MOUSE: 0,
    RUN_AWAY_FROM_MOUSE: 1,
    RUN_AROUND_RANDOMLY: 2,
    PACE_AROUND_SCREEN: 3,
    RUN_AROUND: 4,
  };

  // Animation timing constants (in frames)
  const STOP_TIME = 4;
  const WASH_TIME = 10;
  const SCRATCH_TIME = 4;
  const YAWN_TIME = 3;
  const AWAKE_TIME = 3;
  const CLAW_TIME = 10;

  // Sprite size
  const SPRITE_SIZE = 32;

  class Neko {
    constructor(options = {}) {
      // Configuration
      this.fps = options.fps || 120; // Target FPS (default 120 for smooth movement)
      // Original used 16 pixels/tick for 640x480 screens (~2.5% of width)
      // Modern screens are ~3x larger, so default to 24 for similar feel
      this.speed = options.speed || 24;
      this.behaviorMode = options.behaviorMode || BehaviorMode.CHASE_MOUSE;
      this.idleThreshold = options.idleThreshold || 6; // Original m_dwIdleSpace = 6

      // State
      this.state = NekoState.STOP;
      this.tickCount = 0; // Increments every frame (like m_uTickCount)
      this.stateCount = 0; // Increments every 2 original ticks (like m_uStateCount)

      // Position (display position for smooth rendering)
      this.x = options.startX || 0;
      this.y = options.startY || 0;
      // Logic position (updated at original 5 FPS tick rate)
      this.logicX = this.x;
      this.logicY = this.y;
      // Previous logic position (for interpolation)
      this.prevLogicX = this.x;
      this.prevLogicY = this.y;
      // Target tracking
      this.targetX = this.x;
      this.targetY = this.y;
      this.oldTargetX = this.x;
      this.oldTargetY = this.y;
      // Movement deltas (preserved like m_nDX, m_nDY in original)
      this.moveDX = 0;
      this.moveDY = 0;

      // Bounds - clientWidth excludes scrollbar, innerHeight is viewport height
      this.boundsWidth = document.documentElement.clientWidth - SPRITE_SIZE;
      this.boundsHeight = window.innerHeight - SPRITE_SIZE;

      // Mouse tracking - null until first mouse event
      // This prevents neko from running somewhere before user moves mouse
      this.mouseX = null;
      this.mouseY = null;
      this.hasMouseMoved = false;

      // DOM element
      this.element = null;
      this.spriteImages = [];
      this.allowBehaviorChange = options.allowBehaviorChange !== false; // Default true

      // Animation lookup table (maps state to sprite indices)
      // Format: [frame1_index, frame2_index]
      // These MUST match the original C++ m_nAnimation table EXACTLY
      // From Neko.cpp lines 40-57:
      this.animationTable = [
        [28, 28], // STOP: m_nAnimation[STOP][0]=28, [1]=28
        [25, 28], // WASH: m_nAnimation[WASH][0]=25, [1]=28
        [26, 27], // SCRATCH: m_nAnimation[SCRATCH][0]=26, [1]=27
        [29, 29], // YAWN: m_nAnimation[YAWN][0]=29, [1]=29
        [30, 31], // SLEEP: m_nAnimation[SLEEP][0]=30, [1]=31
        [0, 0], // AWAKE: m_nAnimation[AWAKE][0]=0, [1]=0
        [1, 2], // U_MOVE: m_nAnimation[U_MOVE][0]=1, [1]=2
        [9, 10], // D_MOVE: m_nAnimation[D_MOVE][0]=9, [1]=10
        [13, 14], // L_MOVE: m_nAnimation[L_MOVE][0]=13, [1]=14
        [5, 6], // R_MOVE: m_nAnimation[R_MOVE][0]=5, [1]=6
        [15, 16], // UL_MOVE: m_nAnimation[UL_MOVE][0]=15, [1]=16
        [3, 4], // UR_MOVE: m_nAnimation[UR_MOVE][0]=3, [1]=4
        [11, 12], // DL_MOVE: m_nAnimation[DL_MOVE][0]=11, [1]=12
        [7, 8], // DR_MOVE: m_nAnimation[DR_MOVE][0]=7, [1]=8
        [17, 18], // U_CLAW: m_nAnimation[U_CLAW][0]=17, [1]=18
        [23, 24], // D_CLAW: m_nAnimation[D_CLAW][0]=23, [1]=24
        [21, 22], // L_CLAW: m_nAnimation[L_CLAW][0]=21, [1]=22
        [19, 20], // R_CLAW: m_nAnimation[R_CLAW][0]=19, [1]=20
      ];

      // Additional state for behaviors
      this.cornerIndex = 0;
      this.ballX = 0;
      this.ballY = 0;
      this.ballVX = 0;
      this.ballVY = 0;

      this.init();
    }

    init() {
      // Create the neko element with defensive styles to prevent global CSS interference
      this.element = document.createElement("div");
      this.element.className = "neko";
      this.element.style.cssText = `
        position: fixed;
        width: ${SPRITE_SIZE}px;
        height: ${SPRITE_SIZE}px;
        image-rendering: pixelated;
        pointer-events: ${this.allowBehaviorChange ? "auto" : "none"};
        cursor: ${this.allowBehaviorChange ? "pointer" : "default"};
        z-index: 999999;
        left: ${this.x}px;
        top: ${this.y}px;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        overflow: visible;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
      `;

      // Create image element with defensive styles to prevent global CSS interference
      const img = document.createElement("img");
      img.style.cssText = `
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
        max-width: none;
        max-height: none;
        display: block;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
      `;
      this.element.appendChild(img);

      document.body.appendChild(this.element);

      // Click to cycle through behaviors
      // Use mousedown instead of click - click requires mouseup on same element,
      // which fails if the cat moves between mousedown and mouseup
      if (this.allowBehaviorChange) {
        this.element.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          e.preventDefault(); // Prevent text selection
          // Make cat appear surprised/awake
          this.setState(NekoState.AWAKE);
          this.cycleBehavior();
        });
      }

      // Track mouse position - set flag on first move
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.hasMouseMoved = true;
      });

      // Update bounds on resize
      window.addEventListener("resize", () => {
        this.boundsWidth = document.documentElement.clientWidth - SPRITE_SIZE;
        this.boundsHeight = window.innerHeight - SPRITE_SIZE;
      });

      // Random starting position within viewport
      this.x = Math.random() * this.boundsWidth;
      this.y = Math.random() * this.boundsHeight;
      this.logicX = this.x;
      this.logicY = this.y;
      this.prevLogicX = this.x;
      this.prevLogicY = this.y;
      // Initialize target to current position (so no initial movement)
      this.targetX = this.x + SPRITE_SIZE / 2;
      this.targetY = this.y + SPRITE_SIZE - 1;
      this.oldTargetX = this.targetX;
      this.oldTargetY = this.targetY;
      this.updatePosition();

      // Animation loop
      this.running = false;
      this.intervalId = null;
    }

    start() {
      if (this.running) return;
      this.running = true;

      // Calculate interval from FPS
      // Higher FPS = smoother movement while maintaining same speed
      const interval = 1000 / this.fps;
      this.intervalId = setInterval(() => {
        this.update();
      }, interval);
    }

    stop() {
      this.running = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    setSprites(sprites) {
      this.spriteImages = sprites;
      this.updateSprite();
    }

    updateSprite() {
      if (this.spriteImages.length === 0) return;

      // Get the current animation frame index
      // Uses tickCount which is scaled to match original 5 FPS timing
      let frameIndex;
      if (this.state === NekoState.SLEEP) {
        // Slower animation for sleep (toggles every 4 ticks in original = 800ms)
        frameIndex =
          this.animationTable[this.state][(this.tickCount >> 2) & 0x1];
      } else {
        // Normal animation speed (toggles every tick in original = 200ms)
        frameIndex = this.animationTable[this.state][this.tickCount & 0x1];
      }

      // Update the image
      const img = this.element.querySelector("img");
      if (img && this.spriteImages[frameIndex]) {
        img.src = this.spriteImages[frameIndex];
      }
    }

    updatePosition() {
      this.element.style.left = Math.round(this.x) + "px";
      this.element.style.top = Math.round(this.y) + "px";
    }

    update() {
      // Track time accumulator for original tick timing
      // Original runs at 5 FPS (200ms per tick), we run at this.fps
      // We need to accumulate fractional ticks and process when we hit a full tick
      if (this.tickAccumulator === undefined) this.tickAccumulator = 0;

      const originalFPS = 5;
      this.tickAccumulator += originalFPS / this.fps;

      // Process as many original ticks as have accumulated
      while (this.tickAccumulator >= 1) {
        this.tickAccumulator -= 1;
        // Save previous position before processing tick
        this.prevLogicX = this.logicX;
        this.prevLogicY = this.logicY;
        this.processOriginalTick();
      }

      // Smooth interpolation between logic positions
      // tickAccumulator represents progress (0-1) towards next tick
      const t = this.tickAccumulator;
      this.x = this.prevLogicX + (this.logicX - this.prevLogicX) * t;
      this.y = this.prevLogicY + (this.logicY - this.prevLogicY) * t;

      // Update display position every frame
      this.updatePosition();
    }

    processOriginalTick() {
      // This runs at the original 5 FPS equivalent timing
      // Increment tick counter (like m_uTickCount)
      this.tickCount++;
      if (this.tickCount >= 9999) this.tickCount = 0;

      // Increment state counter every 2 ticks (like original)
      if (this.tickCount % 2 === 0) {
        this.stateCount++;
      }

      // Update behavior based on mode
      switch (this.behaviorMode) {
        case BehaviorMode.CHASE_MOUSE:
          this.chaseMouse();
          break;
        case BehaviorMode.RUN_AWAY_FROM_MOUSE:
          this.runAwayFromMouse();
          break;
        case BehaviorMode.RUN_AROUND_RANDOMLY:
          this.runRandomly();
          break;
        case BehaviorMode.PACE_AROUND_SCREEN:
          this.paceAroundScreen();
          break;
        case BehaviorMode.RUN_AROUND:
          this.runAround();
          break;
      }

      // Update animation frame
      this.updateSprite();
    }

    chaseMouse() {
      // Don't chase until mouse has moved at least once
      if (!this.hasMouseMoved) {
        // Just idle in place - pass target that results in zero movement
        this.runTowards(
          this.logicX + SPRITE_SIZE / 2,
          this.logicY + SPRITE_SIZE - 1
        );
        return;
      }
      this.runTowards(this.mouseX, this.mouseY);
    }

    runAwayFromMouse() {
      // Don't run away until mouse has moved
      if (!this.hasMouseMoved) {
        this.runTowards(
          this.logicX + SPRITE_SIZE / 2,
          this.logicY + SPRITE_SIZE - 1
        );
        return;
      }

      // Original uses m_dwIdleSpace * 16 as the trigger distance
      const dwLimit = this.idleThreshold * 16;
      const xdiff = this.logicX + SPRITE_SIZE / 2 - this.mouseX;
      const ydiff = this.logicY + SPRITE_SIZE / 2 - this.mouseY;

      if (Math.abs(xdiff) < dwLimit && Math.abs(ydiff) < dwLimit) {
        // Mouse cursor is too close - run away
        const dLength = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        let targetX, targetY;
        if (dLength !== 0) {
          targetX = this.logicX + (xdiff / dLength) * dwLimit;
          targetY = this.logicY + (ydiff / dLength) * dwLimit;
        } else {
          targetX = targetY = 32;
        }
        this.runTowards(targetX, targetY);
        // Skip awake animation like original
        if (this.state === NekoState.AWAKE) {
          this.calcDirection(targetX - this.logicX, targetY - this.logicY);
        }
      } else {
        // Keep running to current target (idle in place)
        this.runTowards(this.targetX, this.targetY);
      }
    }

    runRandomly() {
      // Original: increments actionCount while sleeping, picks new target after idleSpace*10
      if (this.state === NekoState.SLEEP) {
        this.actionCount = (this.actionCount || 0) + 1;
      }
      if ((this.actionCount || 0) > this.idleThreshold * 10) {
        this.actionCount = 0;
        this.targetX = Math.random() * this.boundsWidth;
        this.targetY = Math.random() * this.boundsHeight;
        this.runTowards(this.targetX, this.targetY);
      } else {
        this.runTowards(this.targetX, this.targetY);
      }
    }

    paceAroundScreen() {
      // Original checks if neko has stopped moving (m_nDX == 0 && m_nDY == 0)
      // We track this via lastMoveDX/DY
      if (this.lastMoveDX === 0 && this.lastMoveDY === 0) {
        this.cornerIndex = ((this.cornerIndex || 0) + 1) % 4;
      }

      // Corners offset by sprite size (matching original)
      // Target positions that result in neko stopping at the corners
      const corners = [
        [SPRITE_SIZE + SPRITE_SIZE / 2, SPRITE_SIZE + SPRITE_SIZE - 1],
        [
          SPRITE_SIZE + SPRITE_SIZE / 2,
          this.boundsHeight - SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
        [
          this.boundsWidth - SPRITE_SIZE + SPRITE_SIZE / 2,
          this.boundsHeight - SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
        [
          this.boundsWidth - SPRITE_SIZE + SPRITE_SIZE / 2,
          SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
      ];

      const target = corners[this.cornerIndex || 0];
      this.runTowards(target[0], target[1]);
    }

    runAround() {
      // Original ball physics with repelling from edges
      const dwBoundingBox = this.speed * 8;

      // Initialize ball if needed (matching original constructor)
      if (this.ballX === 0 && this.ballY === 0) {
        this.ballX = Math.random() * (this.boundsWidth - dwBoundingBox);
        this.ballY = Math.random() * (this.boundsHeight - dwBoundingBox);
        this.ballVX = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
        this.ballVY = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
      }

      // Move invisible ball
      this.ballX += this.ballVX;
      this.ballY += this.ballVY;

      // Repel from edges (original logic)
      if (this.ballX < dwBoundingBox) {
        if (this.ballX > 0) this.ballVX++;
        else this.ballVX = -this.ballVX;
      } else if (this.ballX > this.boundsWidth - dwBoundingBox) {
        if (this.ballX < this.boundsWidth) this.ballVX--;
        else this.ballVX = -this.ballVX;
      }

      if (this.ballY < dwBoundingBox) {
        if (this.ballY > 0) this.ballVY++;
        else this.ballVY = -this.ballVY;
      } else if (this.ballY > this.boundsHeight - dwBoundingBox) {
        if (this.ballY < this.boundsHeight) this.ballVY--;
        else this.ballVY = -this.ballVY;
      }

      this.runTowards(this.ballX, this.ballY);
    }

    setState(newState) {
      // Reset counters on state change (like original SetState)
      this.tickCount = 0;
      this.stateCount = 0;
      this.state = newState;
    }

    runTowards(targetX, targetY) {
      // Store old target for MoveStart check
      this.oldTargetX = this.targetX;
      this.oldTargetY = this.targetY;
      this.targetX = targetX;
      this.targetY = targetY;

      // Calculate distance to target (using logic position, not display position)
      const dx = targetX - this.logicX - SPRITE_SIZE / 2; // Stop in middle of cursor
      const dy = targetY - this.logicY - SPRITE_SIZE + 1; // Just above cursor
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate movement delta (like original m_nDX, m_nDY)
      // Store as instance variables so they persist across ticks
      // IMPORTANT: Use integers like original to prevent direction flickering
      // which causes state resets and prevents wall clawing
      if (distance !== 0) {
        if (distance <= this.speed) {
          // Less than top speed - jump the gap
          this.moveDX = Math.trunc(dx);
          this.moveDY = Math.trunc(dy);
        } else {
          // More than top speed - run at top speed
          this.moveDX = Math.trunc((this.speed * dx) / distance);
          this.moveDY = Math.trunc((this.speed * dy) / distance);
        }
      } else {
        this.moveDX = 0;
        this.moveDY = 0;
      }

      // Store for paceAroundScreen check
      this.lastMoveDX = this.moveDX;
      this.lastMoveDY = this.moveDY;

      // Check if target moved (MoveStart equivalent)
      const moveStart = !(
        this.oldTargetX >= this.targetX - this.idleThreshold &&
        this.oldTargetX <= this.targetX + this.idleThreshold &&
        this.oldTargetY >= this.targetY - this.idleThreshold &&
        this.oldTargetY <= this.targetY + this.idleThreshold
      );

      // State machine (matching original RunTowards switch)
      switch (this.state) {
        case NekoState.STOP:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= STOP_TIME) {
            // Check for wall scratching using preserved moveDX/moveDY
            if (this.moveDX < 0 && this.logicX <= 0) {
              this.setState(NekoState.L_CLAW);
            } else if (this.moveDX > 0 && this.logicX >= this.boundsWidth) {
              this.setState(NekoState.R_CLAW);
            } else if (this.moveDY < 0 && this.logicY <= 0) {
              this.setState(NekoState.U_CLAW);
            } else if (this.moveDY > 0 && this.logicY >= this.boundsHeight) {
              this.setState(NekoState.D_CLAW);
            } else {
              this.setState(NekoState.WASH);
            }
          }
          break;

        case NekoState.WASH:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= WASH_TIME) {
            this.setState(NekoState.SCRATCH);
          }
          break;

        case NekoState.SCRATCH:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= SCRATCH_TIME) {
            this.setState(NekoState.YAWN);
          }
          break;

        case NekoState.YAWN:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= YAWN_TIME) {
            this.setState(NekoState.SLEEP);
          }
          break;

        case NekoState.SLEEP:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          }
          break;

        case NekoState.AWAKE:
          if (this.stateCount >= AWAKE_TIME + Math.floor(Math.random() * 20)) {
            this.calcDirection(this.moveDX, this.moveDY);
          }
          break;

        case NekoState.U_MOVE:
        case NekoState.D_MOVE:
        case NekoState.L_MOVE:
        case NekoState.R_MOVE:
        case NekoState.UL_MOVE:
        case NekoState.UR_MOVE:
        case NekoState.DL_MOVE:
        case NekoState.DR_MOVE:
          // Calculate new position using preserved moveDX/moveDY
          let newX = this.logicX + this.moveDX;
          let newY = this.logicY + this.moveDY;
          const wasOutside =
            newX <= 0 ||
            newX >= this.boundsWidth ||
            newY <= 0 ||
            newY >= this.boundsHeight;

          // Update direction
          this.calcDirection(this.moveDX, this.moveDY);

          // Clamp position
          newX = Math.max(0, Math.min(this.boundsWidth, newX));
          newY = Math.max(0, Math.min(this.boundsHeight, newY));
          const notMoved = newX === this.logicX && newY === this.logicY;

          // Stop if we can't go further
          if (wasOutside && notMoved) {
            this.setState(NekoState.STOP);
          } else {
            this.logicX = newX;
            this.logicY = newY;
          }
          break;

        case NekoState.U_CLAW:
        case NekoState.D_CLAW:
        case NekoState.L_CLAW:
        case NekoState.R_CLAW:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= CLAW_TIME) {
            this.setState(NekoState.SCRATCH);
          }
          break;

        default:
          this.setState(NekoState.STOP);
          break;
      }
    }

    calcDirection(dx, dy) {
      // Calculate direction based on movement delta (like original CalcDirection)
      let newState;

      if (dx === 0 && dy === 0) {
        newState = NekoState.STOP;
      } else {
        const largeX = dx;
        const largeY = -dy; // Y is inverted
        const length = Math.sqrt(largeX * largeX + largeY * largeY);
        const sinTheta = largeY / length;

        const sinPiPer8 = 0.3826834323651;
        const sinPiPer8Times3 = 0.9238795325113;

        if (dx > 0) {
          if (sinTheta > sinPiPer8Times3) {
            newState = NekoState.U_MOVE;
          } else if (sinTheta > sinPiPer8) {
            newState = NekoState.UR_MOVE;
          } else if (sinTheta > -sinPiPer8) {
            newState = NekoState.R_MOVE;
          } else if (sinTheta > -sinPiPer8Times3) {
            newState = NekoState.DR_MOVE;
          } else {
            newState = NekoState.D_MOVE;
          }
        } else {
          if (sinTheta > sinPiPer8Times3) {
            newState = NekoState.U_MOVE;
          } else if (sinTheta > sinPiPer8) {
            newState = NekoState.UL_MOVE;
          } else if (sinTheta > -sinPiPer8) {
            newState = NekoState.L_MOVE;
          } else if (sinTheta > -sinPiPer8Times3) {
            newState = NekoState.DL_MOVE;
          } else {
            newState = NekoState.D_MOVE;
          }
        }
      }

      if (this.state !== newState) {
        this.setState(newState);
      }
    }

    isIdle() {
      return (
        this.state === NekoState.STOP ||
        this.state === NekoState.WASH ||
        this.state === NekoState.SCRATCH ||
        this.state === NekoState.YAWN ||
        this.state === NekoState.SLEEP ||
        this.state === NekoState.AWAKE
      );
    }

    cycleBehavior() {
      // Cycle through behaviors: Chase -> Run Away -> Random -> Pace -> Run Around -> back to Chase
      const behaviors = [
        BehaviorMode.CHASE_MOUSE,
        BehaviorMode.RUN_AWAY_FROM_MOUSE,
        BehaviorMode.RUN_AROUND_RANDOMLY,
        BehaviorMode.PACE_AROUND_SCREEN,
        BehaviorMode.RUN_AROUND,
      ];
      const currentIndex = behaviors.indexOf(this.behaviorMode);
      const nextIndex = (currentIndex + 1) % behaviors.length;
      this.behaviorMode = behaviors[nextIndex];

      // Reset state to wake the cat up if sleeping
      if (this.state === NekoState.SLEEP) {
        this.setState(NekoState.AWAKE);
      }

      // Show behavior name (optional - can be removed if you don't want this)
      const behaviorNames = [
        "Chase Mouse",
        "Run Away From Mouse",
        "Run Around Randomly",
        "Pace Around Screen",
        "Run Around",
      ];
      console.log(`Neko behavior: ${behaviorNames[nextIndex]}`);
    }

    destroy() {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }

  // Export to global scope
  window.Neko = Neko;
  window.NekoState = NekoState;
  window.BehaviorMode = BehaviorMode;

    // Auto-initialize function
    window.createNeko = function(options) {
        const neko = new Neko(options);
        neko.setSprites(NEKO_SPRITES);
        neko.start();
        return neko;
    };

    // Auto-start if script has data-autostart attribute
    if (document.currentScript && document.currentScript.hasAttribute("data-autostart")) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                window.neko = createNeko();
            });
        } else {
            window.neko = createNeko();
        }
    }
})();
